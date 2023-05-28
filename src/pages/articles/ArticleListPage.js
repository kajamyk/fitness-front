import {Link as RouterLink, useParams} from 'react-router-dom';
import {Card, Link, Rating} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import * as React from "react";
import { styled } from '@mui/material/styles';
import useHttp from "../../hooks/use-http";
import {useState, useEffect} from "react";


const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#7181B2',
    },
    '& .MuiRating-iconHover': {
        color: 'gray',
    },
});

const ArticleListPage = () => {
    const {category} = useParams();
    const [articles, setArticles] = useState([]);
    const { isLoading, sendRequest } = useHttp();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                await sendRequest({
                    url: 'http://localhost:8080/articles/' + category,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('Auth')
                    },
                }, setArticlesData);
            } catch (error) {

            }
        };
        fetchArticles();
    }, [sendRequest, category]);

    const setArticlesData = (data) => {
        setArticles(data.articles);
    }

    return <Card sx={{width:"80vw", backgroundColor: "accent.light", margin:"1rem", minWidth:"min-content"}}>
        <List>
            {articles.map(article => (
                <Link component={RouterLink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to={`/articles/${category}/${article.id}`} key={article.id}>
                    <ListItem>
                        <ListItemButton>
                            <ListItemText primary={article.title} secondary={"Autor: " + article.author}/>
                            <StyledRating name="read-only" value={article.rating} icon={<FavoriteBorderIcon />}  emptyIcon={<FavoriteBorderIcon />} readOnly sx={{marginRight:"50rem", marginTop:"10rem", color:"secondary"}}/>
                            <ListItemAvatar>
                                <img src={article.pictureLink} width="200vw"></img>
                            </ListItemAvatar>
                        </ListItemButton>
                    </ListItem>
                </Link>
            ))}

        </List>
    </Card>
}

export default ArticleListPage;