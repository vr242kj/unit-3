import React, {useEffect, useState} from 'react';
import PageContainer from "./components/PageContainer";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import Typography from "../components/Typography";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import {Grid, Snackbar} from "@mui/material";

const PostDetail = (props) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [editMode, setEditMode] = useState(false);
    const [post, setPost] = useState({}); // State to hold entity data fetched from backend
    const [editedPost, setEditedPost] = useState({});
    const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState({})

    const handleGoBack = () => {
        navigate('/posts'); // Replace '/entity-list' with the actual route of your entity list page
    };

    useEffect(() => {
        fetchEntity(id);
    }, [id]);


    const fetchEntity = async (id) => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                setPost(res);
            })
            .catch(error => {
                console.error('Error fetching post by id:', error);
            })
    };

    const handleEditToggle = () => {
        setValidationErrors({});
        setEditedPost({});
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditedPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    };

    const validateFields = () => {
        const errors = {};

        if (!editedPost.name || editedPost.name.trim() === '') {
            errors.name = 'Name is required';
        }

        if (!editedPost.username || editedPost.username.trim() === '') {
            errors.username = 'Username is required';
        }

        if (!editedPost.email || !isValidEmail(editedPost.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!/^[\d-+]+$/.test(editedPost.phone)) {
            errors.phone = 'Please enter a valid phone number';
        }

        if (!/^(https?:\/\/)?([\w\d\-]+\.)+[\w\d]{2,}(\/.*)?$/.test(editedPost.website)) {
            errors.website = 'Please enter a valid website URL';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
            axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, editedPost)
                .then((res) => {
                    fetchEntity();
                    setEditMode(false);
                    setEditedPost({});
                    setSuccessSnackbarOpen(true);
                })
                .catch(error => {
                    setErrorSnackbarOpen(true);
                    console.error('Error sending data:', error);
                });
        }
    };

    const handleSnackbarClose = () => {
        setSuccessSnackbarOpen(false);
        setErrorSnackbarOpen(false);
    };


    return (
        <PageContainer>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">Детальна інформація сутності</Typography>
                </Grid>
                <Grid item xs={12}>
                    {editMode ? (
                        <Grid item xs={12}>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <label>
                                            Name:
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder={post.name}
                                                value={editedPost.name}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        {validationErrors.name && <span style={{color: 'red'}}
                                                                        className="error">{validationErrors.name}</span>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <label>
                                            Username:
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder={post.username}
                                                value={editedPost.username}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        {validationErrors.username && <span style={{color: 'red'}}
                                                                            className="error">{validationErrors.username}</span>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <label>
                                            Email:
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder={post.email}
                                                value={editedPost.email}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        {validationErrors.email && <span style={{color: 'red'}}
                                                                         className="error">{validationErrors.email}</span>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <label>
                                            Phone:
                                            <input
                                                type="text"
                                                name="phone"
                                                placeholder={post.phone}
                                                value={editedPost.phone}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        {validationErrors.phone && <span style={{color: 'red'}}
                                                                         className="error">{validationErrors.phone}</span>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <label>
                                            Website:
                                            <input
                                                type="text"
                                                name="website"
                                                placeholder={post.website}
                                                value={editedPost.website}
                                                onChange={handleInputChange}
                                            />
                                        </label>
                                        {validationErrors.website && <span style={{color: 'red'}}
                                                                           className="error">{validationErrors.website}</span>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <button type="submit">Submit</button>
                                        <Button onClick={handleEditToggle}>Скасувати</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    ) : (
                        <>
                            <IconButton onClick={handleEditToggle}>
                                <span role="img" aria-label="Edit">✏️️</span>
                            </IconButton>
                            <Typography>Id: {post.id}</Typography>
                            <Typography>Name: {post.name}</Typography>
                            <Typography>Username: {post.username}</Typography>
                            <Typography>Email: {post.email}</Typography>
                            <Typography>Phone: {post.phone}</Typography>
                            <Typography>Website: {post.website}</Typography>
                            <Grid item xs={12}>
                                <Button onClick={handleGoBack}>Назад</Button>
                            </Grid>
                        </>
                    )}
                </Grid>
                <Snackbar
                    open={successSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    message="Зміни збережено"
                />
                <Snackbar
                    open={errorSnackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    message="Помилка під час збереження. Будь ласка, спробуйте ще раз."
                />
            </Grid>
        </PageContainer>
    );
};

export default PostDetail;