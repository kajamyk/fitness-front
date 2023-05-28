import {useParams} from 'react-router-dom';
import {Box, Button, Card, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import * as React from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import useHttp from "../../hooks/use-http";

const ForumPage = () => {
    const {id} = useParams()
    const [forumPost, setForumPost] = useState([]);
    const { sendRequest } = useHttp();
    const userName = forumPost.author === undefined ? '' : forumPost.author.userName;
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                await sendRequest({
                    url: 'http://localhost:8080/forum/post/' + id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('Auth')
                    },
                }, setForumDataRequest);
            } catch (error) {

            }
        };
        fetchPosts();
        const intervalId = setInterval(fetchPosts, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [sendRequest, id]);

    const setForumDataRequest = (data) => {
        setForumPost(data.post);
    }

    const validationSchema = yup.object({
        postComment: yup
            .string('Podaj komentarz')
            .required('Komentarz jest wymagany'),
    });

    const { sendRequest: sendPostRequest } = useHttp();
    const postHandler = async (body) => {
        try {
            await sendPostRequest({
                url: 'http://localhost:8080/forum/post/' + id + "/comment",
                method: "POST",
                body: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('Auth')
                },
            });
        } catch (error) {

        }
    };


    const formik = useFormik({
        initialValues: {
            postComment: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            resetForm();
            postHandler(JSON.stringify(values))
        },
    });

    return <Card sx={{width: "80vw", backgroundColor: "accent.light", margin: "1rem"}}>
        <Box sx={{justifyContent: "space-between", display: "flex", width: "100%"}}>
            <CardHeader action={forumPost.forumPostTitle}></CardHeader>
            <Typography sx={{margin: '1rem'}}>{userName}</Typography>
        </Box>
        <CardContent>
            <Typography>{forumPost.forumPostText}</Typography>

        </CardContent>
        {typeof forumPost.comments !== "undefined" && forumPost.comments.map(comment => (
            <Card sx={{margin: "1rem", marginRight: "3rem"}}>
                <Typography sx={{margin: "1rem", textAlign: "right"}}> {comment.author !== undefined && comment.author !== null
                    ? comment.author.userName
                    : ''}</Typography>
                <Typography sx={{margin: "1rem"}}>{comment.commentText}</Typography>
            </Card>
        ))}
        <form onSubmit={formik.handleSubmit}>
            <TextField
                multiline
                rows="5"
                id="postComment"
                name="postComment"
                label="Komentarz"
                type="text"
                sx={{margin: '1rem', width: "60%"}}
                value={formik.values.postComment}
                onChange={formik.handleChange}
                error={formik.touched.postComment && Boolean(formik.errors.postComment)}
                helperText={formik.touched.postComment && formik.errors.postComment}
            />
            <Button
                color="primary" variant="contained" type="submit"
                sx={{margin: '2rem'}}
                disabled={formik.touched.postComment && formik.errors.postComment}>
                Dodaj komentarz
            </Button>
        </form>

    </Card>
}

export default ForumPage;