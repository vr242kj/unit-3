import React, {useEffect} from 'react';
import PageContainer from "../../../pageProviders/components/PageContainer";
import {useLocation, useParams} from "react-router-dom";
import Grid from "../../../components/Grid";
import useChangePage from "../../../misc/hooks/useChangePage";
import * as pages from "../../../constants/pages";
import pageURLs from "../../../constants/pagesURLs";
import {useIntl} from "react-intl";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchPostById,
    setEditedPost,
    setValidationErrors,
    toggleCreateMode, toggleEditMode
} from "../actions/postDetail";
import ValidationSnackbar from "../components/ValidationSnackbar";
import PostDetailView from "../components/PostDetailView";
import PostDetailForm from "../components/PostDetailForm";


function PostDetail() {
    const {id} = useParams();
    const location = useLocation();
    const changePage = useChangePage();
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    const {
        editMode,
        createMode,
        post
    } = useSelector(({postDetail}) => postDetail);

    const handleGoBack = () => {
        changePage({pathname: pageURLs[pages.postListPage]});
    };

    useEffect(() => {
        dispatch(fetchPostById(id, location))
    }, [dispatch, id, location]);

    const handleEditToggle = () => {
        if (createMode) {
            dispatch(toggleCreateMode())
            handleGoBack();
        } else {
            dispatch(setValidationErrors({}))
            dispatch(setEditedPost({}))
            dispatch(toggleEditMode())
        }
    };

    return (
        <PageContainer>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {(editMode || createMode) ? (
                        <PostDetailForm
                            handleEditToggle={handleEditToggle}
                        />
                    ) : (
                        <PostDetailView post={post} handleGoBack={handleGoBack} handleEditToggle={handleEditToggle}/>
                    )}
                </Grid>
                <ValidationSnackbar/>
            </Grid>
        </PageContainer>
    );
};

export default PostDetail;