import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PageContainer from "./components/PageContainer";
import {
    Pagination,
    DialogActions,
    DialogContent,
    DialogTitle, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText, Snackbar, Grid
} from "@mui/material";
import Typography from "../components/Typography";
import Dialog from "../components/Dialog";
import Button from "../components/Button";
import Link from "../components/Link";
import {useNavigate} from "react-router-dom";
import pageURLs from 'constants/pagesURLs';
import * as pages from "../constants/pages";

function PostList() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteSuccessSnackbarOpen, setDeleteSuccessSnackbarOpen] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState(""); // State for error message
    const [hoveredEntityIndex, setHoveredEntityIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(() => {
        return parseInt(localStorage.getItem('currentPage')) || 1;
    });
    const [entitiesPerPage] = useState(3);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState(() => {
        const savedFilters = localStorage.getItem('filters');
        return savedFilters ? JSON.parse(savedFilters) : {};
    });

    const navigateToAddEntity = () => {
        navigate(pageURLs[pages.postDetailPage]);
    };

    useEffect(() => {
        fetchEntities()
    }, [currentPage, filters]);

    const handleDeleteConfirmation = async () => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${selectedPost.id}`)
            .then(async () => {
                await fetchEntities();
                setDeleteSuccessSnackbarOpen(true);
                handleCloseDeleteConfirmation();
            })
            .catch(error => {
                setDeleteErrorMessage("Помилка під час видалення сутності");
                console.error('Error fetching posts:', error);
            });
    };

    const handleOpenDeleteConfirmation = (post, event) => {
        setSelectedPost(post);
        setDeleteConfirmationOpen(true);
    };

    const handleCloseDeleteConfirmation = () => {
        setSelectedPost(null);
        setDeleteConfirmationOpen(false);
        setDeleteErrorMessage("");
    };

    const handleSnackbarClose = () => {
        setDeleteSuccessSnackbarOpen(false);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const fetchEntities = async () => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then((res) => {
                const totalPagesCount = Math.ceil(res.length / entitiesPerPage);
                setTotalPages(totalPagesCount);

                const startIndex = (currentPage - 1) * entitiesPerPage;
                const endIndex = Math.min(startIndex + entitiesPerPage, res.length);
                const paginatedPosts = res.slice(startIndex, endIndex);
                setPosts(paginatedPosts);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/users', filters)
            .then((res) => {
                const totalPagesCount = Math.ceil(res.length / entitiesPerPage);
                setTotalPages(totalPagesCount);

                const startIndex = (currentPage - 1) * entitiesPerPage;
                const endIndex = Math.min(startIndex + entitiesPerPage, res.length);
                const paginatedPosts = res.slice(startIndex, endIndex);
                setPosts(paginatedPosts);
            })
            .catch(error => {
                // Handle error
                console.error('Error sending data:', error);
            });
    };

    useEffect(() => {
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

    useEffect(() => {
        localStorage.setItem('filters', JSON.stringify(filters));
    }, [filters]);

    const postItems = posts.map(post => (
        <ListItem
            key={post.id}
            onMouseEnter={() => setHoveredEntityIndex(post.id)}
            onMouseLeave={() => setHoveredEntityIndex(null)}
        >
            <ListItemButton component={Link} to={`/posts/${post.id}`}>
                <ListItemText
                    primary={<Typography>User: {post.username}</Typography>}
                    secondary={<Typography>Email: {post.email}</Typography>}
                />
            </ListItemButton>
            {hoveredEntityIndex === post.id && (
                <IconButton edge="end" onClick={(event) => handleOpenDeleteConfirmation(post, event)}>
                    <span role="img" aria-label="Delete">❌</span>
                </IconButton>
            )}
        </ListItem>
    ));
    return (
        <PageContainer>
            <Button onClick={navigateToAddEntity}>Додати сутність</Button>

            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={filters.username}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={filters.email}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <List>
                {postItems}
            </List>
            <Dialog open={deleteConfirmationOpen} onClose={handleCloseDeleteConfirmation}>
                <DialogTitle>Видалити сутність?</DialogTitle>
                <DialogContent>
                    <p>Ви впевнені, що хочете видалити цю сутність?</p>
                    {deleteErrorMessage && <p style={{color: "red"}}>{deleteErrorMessage}</p>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteConfirmation} color="primary">Скасувати</Button>
                    <Button onClick={handleDeleteConfirmation} color="primary">Підтвердити</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={deleteSuccessSnackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}
                      message="Сутність була успішно видалена"/>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
            />
        </PageContainer>
    );
};

export default PostList;
