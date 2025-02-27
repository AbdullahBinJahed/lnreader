import cheerio from 'react-native-cheerio';

const sourceId = 76;

const sourceName = 'TravisTranslations';

const baseUrl = 'https://travistranslations.com/';

const popularNovels = async page => {
  let url = baseUrl + 'all-series/';

  if (page > 1) {
    url += `page/${page}/`;
  }

  const totalPages = 19;

  const result = await fetch(url);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  let novels = [];

  loadedCheerio('.group').each(function () {
    const novelName = loadedCheerio(this).find('h3').text();
    const novelCover =
      'https://' + loadedCheerio(this).find('img').attr('data-src');
    const novelUrl = loadedCheerio(this).find(' a').attr('href');

    const novel = {
      sourceId,
      novelName,
      novelCover,
      novelUrl,
    };

    novels.push(novel);
  });

  return {novels, totalPages};
};

const parseNovelAndChapters = async novelUrl => {
  const url = novelUrl;

  const result = await fetch(url);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  let novel = {sourceId, sourceName, url, novelUrl};

  novel.novelName = loadedCheerio('h1').text().trim();

  novel.novelCover =
    'https://' + loadedCheerio('img.object-cover').attr('data-src');

  novel.summary = loadedCheerio('div[property=description]').text().trim();

  novel.genre = '';

  loadedCheerio('div.flex.flex-col.mt-3.text-center > ul > li').each(
    function () {
      novel.genre +=
        loadedCheerio(this)
          .text()
          .replace(/[\t\n]/g, '') + ',';
    },
  );
  loadedCheerio('div.header-stats > span').each(function () {
    if (loadedCheerio(this).find('small').text() === 'Status') {
      novel.status = loadedCheerio(this).find('strong').text();
    }
  });

  novel.genre = novel.genre.slice(0, -1);

  novel.author = loadedCheerio('.author > a > span').text();
  let novelChapters = [];

  loadedCheerio('.tab_content > ul.grid')
    .find('li')
    .each(function () {
      const chapterName = loadedCheerio(this)
        .find('span')
        .first()
        .text()
        .trim();
      const releaseDate = null;
      const chapterUrl = loadedCheerio(this).find('a').attr('href');

      novelChapters.push({chapterName, releaseDate, chapterUrl});
    });

  novel.chapters = novelChapters;

  return novel;
};

const parseChapter = async (novelUrl, chapterUrl) => {
  const result = await fetch(chapterUrl);
  let body = await result.text();

  const loadedCheerio = cheerio.load(body);

  const chapterId = loadedCheerio('input[name=id]').attr('value');

  const url = 'https://travistranslations.com/wp-json/wp/v2/posts/' + chapterId;

  const data = await fetch(url);
  body = await data.json();

  let chapterName = body.title.rendered;
  let chapterText = body.content.rendered;

  const chapter = {
    sourceId,
    novelUrl,
    chapterUrl,
    chapterName,
    chapterText,
  };

  return chapter;
};

const searchNovels = async searchTerm => {
  let url = baseUrl + 'all-series/?search=' + searchTerm;

  const result = await fetch(url);
  const body = await result.text();

  const loadedCheerio = cheerio.load(body);

  let novels = [];

  loadedCheerio('.group').each(function () {
    const novelName = loadedCheerio(this).find('h3').text();
    const novelCover =
      'https://' + loadedCheerio(this).find('img').attr('data-src');
    const novelUrl = loadedCheerio(this).find(' a').attr('href');

    const novel = {
      sourceId,
      novelName,
      novelCover,
      novelUrl,
    };

    novels.push(novel);
  });

  return novels;
};

const TravisTranslationsScraper = {
  popularNovels,
  parseNovelAndChapters,
  parseChapter,
  searchNovels,
};

export default TravisTranslationsScraper;
