import {
  SET_APP_THEME,
  SET_NOVELS_PER_ROW,
  SET_READER_SETTINGS,
  SET_APP_SETTINGS,
  SET_ACCENT_COLOR,
  SET_RIPPLE_COLOR,
  SET_AMOLED_MODE,
} from './settings.types';

export const setAppTheme = val => dispatch => {
  dispatch({
    type: SET_APP_THEME,
    payload: val,
  });
};

export const setNovelsPerRow = val => dispatch => {
  dispatch({
    type: SET_NOVELS_PER_ROW,
    payload: val,
  });
};

export const setAppSettings = (key, val) => dispatch => {
  dispatch({
    type: SET_APP_SETTINGS,
    payload: {key, val},
  });
};

export const setReaderSettings = (key, val) => dispatch => {
  dispatch({
    type: SET_READER_SETTINGS,
    payload: {key, val},
  });
};

export const setAccentColor = val => dispatch => {
  dispatch({
    type: SET_ACCENT_COLOR,
    payload: val,
  });
};

export const setRippleColor = val => dispatch => {
  dispatch({
    type: SET_RIPPLE_COLOR,
    payload: val,
  });
};

export const setAmoledMode = (id, val) => dispatch => {
  dispatch({
    type: SET_AMOLED_MODE,
    payload: {id, val},
  });
};
