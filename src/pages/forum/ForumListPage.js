import {useParams} from 'react-router-dom';
import {Button, Card, Box, TextField, Typography, Snackbar, Select, MenuItem, FormControl, InputLabel} from "@mui/material";
import * as yup from "yup";
import {useFormik} from "formik";
import {useEffect, useState} from 'react'
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';
import ForumList from "../../components/ForumList";
import useHttp from "../../hooks/use-http";
const ForumListPage = (props) => {
    const [forumPosts, setForumPosts] = useState([]);
    const {category} = useParams();
    const [isAddPostVisible, setIsAddPostVisible] = useState(false);
    const [open, setOpen] = React.useState(false);
    const { isLoading, sendRequest: sendPostRequest } = useHttp();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState();
    const postHandler = async (body) => {
        setError(false)
        try {
            await sendPostRequest({
                url: 'http://localhost:8080/forum/post',
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Auth')
                },
            });
            setMessage("Post został dodany");
        } catch (error) {
            setError(true)
            setMessage("Post nie został dodany. Spróbuj ponownie.");
        }
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { sendRequest } = useHttp();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                await sendRequest({
                    url: 'http://localhost:8081/forum/' + category,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('Auth')
                    },
                }, setPostData);
            } catch (error) {

            }
        };
        fetchPosts();
    }, [sendRequest, category]);

    const setPostData = (data) => {
        setForumPosts(data.posts);
    }

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
    const showAddPostHandler = () => {
        setIsAddPostVisible(prev => !prev);
    }

    const validationSchema = yup.object({
        postTitle: yup
            .string('Podaj tytuł')
            .required('Tytuł jest wymagany')
            .min(5, 'Tytuł powinien składać się z conajmniej pięciu znaków'),
        postText: yup
            .string('Podaj treść')
            .required('Treść jest wymagana')
            .min(15, 'Treść powininna składać się z conajmniej piętnastu znaków'),
        category: yup
            .string('Podaj kategorię')
            .required('Kategoria jest wymagana')
    });


    const formik = useFormik({
        initialValues: {
            postTitle: '',
            postText: '',
            category: 'Dieta',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            postHandler(JSON.stringify(values));
            let newId = forumPosts.length;
            handleClick();
            showAddPostHandler();
            setForumPosts([
                ...forumPosts,
            {
                id: newId,
                author:"kaja",
                forumPostTitle: formik.values.postTitle,
            },
            ])

            formik.values.postText='';
            formik.values.postTitle='';
        },
    });
    return <Card sx={{width: "80vw", backgroundColor: "accent.light", margin: "1rem", minWidth: "min-content"}}>
        <Card sx={{backgroundColor: "accent.medium", margin: "1rem",}}>
            {isAddPostVisible && <>
                <Box sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography sx={{margin:"1rem", width:"50%"}} variant={"h4"}>Dodaj nowy post</Typography>
                    <IconButton aria-label="delete" onClick={showAddPostHandler}>
                        <CloseIcon sx={{fontSize: 40}}/>
                    </IconButton>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="postTitle"
                        name="postTitle"
                        label="Tytuł posta"
                        type="text"
                        sx={{margin: '1rem', width: "90%"}}
                        value={formik.values.postTitle}
                        onChange={formik.handleChange}
                        error={formik.touched.postTitle && Boolean(formik.errors.postTitle)}
                        helperText={formik.touched.postTitle && formik.errors.postTitle}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows="10"
                        id="postText"
                        name="postText"
                        label="Zawartość posta"
                        type="text"
                        sx={{margin: '1rem', width: "90%"}}
                        value={formik.values.postText}
                        onChange={formik.handleChange}
                        error={formik.touched.postText && Boolean(formik.errors.postText)}
                        helperText={formik.touched.postText && formik.errors.postText}
                    />
                    <FormControl variant="filled" sx={{ m: 1, width: "90%" }}>
                        <InputLabel id="category+label" sx={{margin:"1rem"}}>Kategoria</InputLabel>
                    <Select
                        sx={{margin: '1rem', width: "100%"}}
                        fullWidth
                        defaultValue="Dieta"
                        id="category"
                        name="category"
                        value={formik.values.category}
                        label="Kategoria"
                        onChange={formik.handleChange}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helperText={formik.touched.category && formik.errors.category}
                    >
                        <MenuItem value={"diet"}>Dieta</MenuItem>
                        <MenuItem value={"training"}>Trening</MenuItem>
                        <MenuItem value={"beauty"}>Uroda</MenuItem>
                    </Select>
                    </FormControl>
                    <Button
                        color="primary" variant="contained" type="submit"
                        sx={{margin: '2rem'}}
                        disabled={(formik.touched.postText && formik.errors.postText) || (formik.touched.postTitle && Boolean(formik.errors.postTitle) || (formik.touched.category && Boolean(formik.errors.category)))}>
                        Dodaj post
                    </Button>
                </form>
            </>}
            {!isAddPostVisible && <Button color="primary" variant="contained"
                                          sx={{margin: '2rem'}} onClick={showAddPostHandler}> Dodaj nowy post</Button>}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </Card>
        <ForumList forumPosts={forumPosts}/>
    </Card>

}

export default ForumListPage;