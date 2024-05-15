const getItem = (key) => {
  return localStorage.getItem(key);
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const keys = {
  TOKEN: 'TOKEN',
  TOKEN_EXPIRATION: 'TOKEN_EXP',
  POST_SEARCH_FILTERS: 'POST_SEARCH_FILTERS',
  CURRENT_PAGE: 'CURRENT_PAGE'
};

const forExport = {
  getItem,
  removeItem,
  setItem,
};

export default forExport;
