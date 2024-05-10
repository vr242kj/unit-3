import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.postListPage]: `${config.UI_URL_PREFIX}/${pages.postListPage}`,
  [pages.postDetailPage]: `${config.UI_URL_PREFIX}/${pages.postDetailPage}`,
};

export default result;
