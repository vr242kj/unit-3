import React, {useEffect} from 'react';
import PageContainer from "../../../pageProviders/components/PageContainer";
import {useLocation, useParams} from "react-router-dom";
import Grid from "../../../components/Grid";
import * as pages from "../../../constants/pages";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchPostById,
    toggleCreateMode
} from "../actions/postDetail";
import ValidationSnackbar from "../components/ValidationSnackbar";
import PostDetailView from "../components/PostDetailView";
import PostDetailForm from "../components/PostDetailForm";


function PostDetail() {
    const {id} = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const {
        editMode,
        createMode
    } = useSelector(({postDetail}) => postDetail);

    useEffect(() => {
        if (location.pathname === `/${pages.secretPage}/${pages.newPostPage}`) {
            dispatch(toggleCreateMode());
        }
    }, []);

    useEffect(() => {
        dispatch(fetchPostById(id))
    }, [dispatch, id]);

    return (
        <PageContainer>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {(editMode || createMode) ? <PostDetailForm/> : <PostDetailView/>}
                </Grid>
                <ValidationSnackbar/>
            </Grid>
        </PageContainer>
    );
}

export default PostDetail;