import * as authorities from 'constants/authorities';
import SecretePage from 'pages/secret';
import React from 'react';

import PageAccessValidator from './components/PageAccessValidator';
import PageContainer from './components/PageContainer';
import pagesURLs from "../constants/pagesURLs";
import * as pages from "../constants/pages";
import Button from "../components/Button";
import Link from "../components/Link";

const Secret = (props) => {
  return (
    <PageAccessValidator
      neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
    >
      <PageContainer>
        <SecretePage {...props} />
        <Link to={{
          pathname: `${pagesURLs[pages.postListPage]}`,
        }}>
          <Button>Перейти к постам</Button>
        </Link>
      </PageContainer>
    </PageAccessValidator>
  );
};

export default Secret;
