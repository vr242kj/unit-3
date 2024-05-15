import React, {useEffect} from 'react';
import PageContainer from "../../../pageProviders/components/PageContainer";
import Button from "../../../components/Button";
import List from "../../../components/List";
import pageURLs from 'constants/pagesURLs';
import * as pages from "../../../constants/pages";
import useChangePage from "../../../misc/hooks/useChangePage";
import {useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {fetchPosts} from "../actions/postList";
import PostItem from "../components/PostItem";
import DeleteSuccessSnackbar from "../components/DeleteSuccessSnackbar";
import PaginationComponent from "../components/PaginationComponent ";
import DeletePostDialog from "../components/DeletePostDialog";
import PostFilterForm from "../components/PostFilterForm";


function PostList() {
    const changePage = useChangePage();
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    const {
        posts,
        filters,
        currentPage,
    } = useSelector(({postList}) => postList);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch, currentPage, filters]);

    const navigateToAddPost = () => {
        changePage({pathname: pageURLs[pages.newPostPage]});
    };

    return (
        <PageContainer>
            <Button onClick={navigateToAddPost}>{formatMessage({id: 'addEntity'})}</Button>
            <PostFilterForm/>
            <List>
                {posts?.map(post => <PostItem key={post.id} post={post}/>)}
            </List>
            <DeletePostDialog/>
            <DeleteSuccessSnackbar/>
            <PaginationComponent/>
        </PageContainer>
    );
}

export default PostList;
