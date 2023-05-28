import List from "@mui/material/List";
import {Link} from "@mui/material";
import {Link as RouterLink, useParams} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import * as React from "react";
import {useState} from "react";

const ForumList = (props) => {
    const {category} = useParams();
    const {forumPosts} = props;

    return <List>
        {forumPosts.map(forum => (
            <Link component={RouterLink} style={{
                color: 'inherit',
                textDecoration: 'none',
            }} to={`/forum/${category}/${forum.forumPostId}`} key={forum.forumPostId}>
                <ListItem>
                    <ListItemButton>
                        <ListItemText primary={forum.forumPostTitle} secondary={"Autor: " + forum.author.userName}/>
                    </ListItemButton>
                </ListItem>
            </Link>
        ))}
    </List>
}

export default ForumList;