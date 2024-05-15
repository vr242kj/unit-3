import * as pages from './pages';
import config from 'config';
import {newPostPage} from "./pages";

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.postListPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}/${pages.postListPage}`,
  [pages.postDetailPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}/${pages.postDetailPage}`,
  [pages.newPostPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}/${pages.newPostPage}`,
};

export default result;
