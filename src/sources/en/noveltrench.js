import cheerio from 'react-native-cheerio';

const baseUrl = 'https://noveltrench.com/';

const popularNovels = async page => {
  let totalPages = 270;
  let url = baseUrl + 'manga/page/' + page;

  const result = await fetch(url);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  let novels = [];

  loadedCheerio('.page-item-detail').each(function () {
    const novelName = loadedCheerio(this).find('.h5 > a').text();
    const novelCover = loadedCheerio(this).find('img').attr('data-src');

    let novelUrl = loadedCheerio(this).find('.h5 > a').attr('href');
    novelUrl = novelUrl.replace(`${baseUrl}manga/`, '');

    const novel = {
      sourceId: 9,
      novelName,
      novelCover,
      novelUrl,
    };

    novels.push(novel);
  });

  return {totalPages, novels};
};

const parseNovelAndChapters = async novelUrl => {
  const url = `${baseUrl}manga/${novelUrl}`;

  const result = await fetch(url);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  let novel = {};

  novel.sourceId = 9;

  novel.sourceName = 'NovelTrench';

  novel.url = url;

  novel.novelUrl = novelUrl;

  novel.novelName = loadedCheerio('.post-title > h1')
    .text()
    .replace(/[\t\n]/g, '')
    .trim();

  novel.novelCover = loadedCheerio('.summary_image > a > img').attr('data-src');

  loadedCheerio('.post-content_item').each(function () {
    const detailName = loadedCheerio(this)
      .find('.summary-heading > h5')
      .text()
      .replace(/[\t\n]/g, '')
      .trim();
    const detail = loadedCheerio(this)
      .find('.summary-content')
      .text()
      .replace(/[\t\n]/g, '')
      .trim();

    switch (detailName) {
      case 'Genre(s)':
        novel.genre = detail.trim().replace(/[\t\n]/g, ',');
        break;
      case 'Author(s)':
        novel.author = detail.trim();
        break;
      case 'Artist(s)':
        novel.status = detail.trim();
        break;
    }
  });

  loadedCheerio('.description-summary > div.summary__content')
    .find('em')
    .remove();

  novel.summary = loadedCheerio('.description-summary > div.summary__content')
    .text()
    .replace(/[\t\n]/g, '');

  let novelChapters = [];

  loadedCheerio('.wp-manga-chapter').each(function () {
    const chapterName = loadedCheerio(this)
      .find('a')
      .text()
      .replace(/[\t\n]/g, '')
      .trim();

    const releaseDate = loadedCheerio(this)
      .find('span')
      .text()
      .replace(/[\t\n]/g, '')
      .trim();

    const chapterUrl = loadedCheerio(this)
      .find('a')
      .attr('href')
      .replace(url, '');
    novelChapters.push({chapterName, releaseDate, chapterUrl});
  });

  novel.chapters = novelChapters.reverse();

  return novel;
};

const parseChapter = async (novelUrl, chapterUrl) => {
  const url = `${baseUrl}manga/${novelUrl}${chapterUrl}`;

  const result = await fetch(url);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  const chapterName = loadedCheerio('h1#chapter-heading').text();
  let chapterText = loadedCheerio('.reading-content').html();
  const chapter = {
    sourceId: 9,
    novelUrl,
    chapterUrl,
    chapterName,
    chapterText,
  };

  return chapter;
};

const searchNovels = async searchTerm => {
  const url = `${baseUrl}?s=${searchTerm}&post_type=wp-manga`;

  const result = await fetch(url);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  let novels = [];

  loadedCheerio('.c-tabs-item__content').each(function () {
    const novelName = loadedCheerio(this).find('.h4 > a').text();
    const novelCover = loadedCheerio(this).find('img').attr('data-src');

    let novelUrl = loadedCheerio(this).find('.h4 > a').attr('href');
    novelUrl = novelUrl.replace(`${baseUrl}manga/`, '');

    const novel = {
      sourceId: 9,
      novelName,
      novelCover,
      novelUrl,
    };

    novels.push(novel);
  });

  return novels;
};

const novelTrenchScraper = {
  popularNovels,
  parseNovelAndChapters,
  parseChapter,
  searchNovels,
};

export default novelTrenchScraper;
