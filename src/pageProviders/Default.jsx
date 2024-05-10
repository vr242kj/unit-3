import DefaultPage from 'pages/default';
import React from 'react';

import PageContainer from './components/PageContainer';
import Button from "../components/Button";
import pagesURLs from "../constants/pagesURLs";
import * as pages from "../constants/pages";
import Link from "../components/Link";

const Default = (props) => {
    return (
        <PageContainer>
            <DefaultPage {...props} />
            <Link to={{
                pathname: `${pagesURLs[pages.postListPage]}`,
            }}>
                <Button>Перейти к постам</Button>
            </Link>
        </PageContainer>
    );
};

export default Default;
