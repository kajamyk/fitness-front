import {useParams} from 'react-router-dom';
import {Box, Card, CardContent, CardHeader, CardMedia, Rating, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as React from "react";
import useHttp from "../../hooks/use-http";
import {useEffect, useState} from "react";


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#7181B2',
    },
    '& .MuiRating-iconHover': {
        color: '#7181B2',
    },
});
const ArticlePage = () => {

    const {id} = useParams();
    const { isLoading, sendRequest } = useHttp();
    const [article, setArticle] = useState("");
    const [rating, setRating] = useState(0)

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                await sendRequest({
                    url: 'http://localhost:8080/articles/article/' + id,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('Auth')
                    },
                }, setArticleData);
            } catch (error) {

            }
        };
        fetchArticles();
    }, [sendRequest, id]);

    const setArticleData = (data) => {
        setArticle(data.article);
        setRating(data.article.rating)
        console.log(article)
    }

    const { sendRequest: sendRatingRequest } = useHttp();
    const ratingHandler = async (body) => {
        try {
            await sendRatingRequest({
                url: 'http://localhost:8080/articles/rating/' + id,
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

    const handleRatingChange = (event, newValue) => {
        const data = {
            rating: newValue
        };
        setRating(newValue)
        ratingHandler(JSON.stringify(data));
    };


    return <Card sx={{width:"80vw", backgroundColor: "accent.light", margin:"1rem"}}>
        <Box sx={{justifyContent:"space-between", display:"flex", width:"100%"}}>
            <CardHeader action={article.title}></CardHeader>
            <CardMedia><img width="250vw" src={article.pictureLink}></img></CardMedia>
        </Box>
        <CardContent>
            <Typography>
                {article.text}
            </Typography>
        </CardContent>
        <StyledRating onChange={handleRatingChange} icon={<FavoriteBorderIcon />}  emptyIcon={<FavoriteBorderIcon />} value={rating} sx={{margin:"1rem"}}/>
    </Card>
}

export default ArticlePage;