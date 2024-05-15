import React, {useMemo} from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';

import getMessages from './intl';
import PostDetail from "./containers/PostDetail";
import configureStore from "../../misc/redux/configureStore";
import rootReducer from "./reducers";
import {Provider} from "react-redux";

function Index(props) {
    const store = configureStore(rootReducer);
    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);

    return (
        <Provider store={store}>
            <IntlProvider messages={messages}>
                <PostDetail/>
            </IntlProvider>
        </Provider>
    );
}

export default Index;