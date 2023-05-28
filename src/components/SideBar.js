import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArticleIcon from '@mui/icons-material/Article';
import ChatIcon from '@mui/icons-material/Chat';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Box, Link, styled} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
const SideBar = (props) => {
    const {handleDrawerClose, open, children} = props;
    return <div>
        <Drawer
            sx={{
                width: "15rem",
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: "15rem",
                    boxSizing: 'border-box',
                    backgroundColor: 'primary.light'
                },

            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {/*{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}*/}
                    <ChevronLeftIcon/>
                </IconButton>
            </DrawerHeader>
            <Divider/>
            <List>

                <ListItem key={"1"} disablePadding>
                    <ListItemIcon>
                        <CalculateIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Kalkulatory"}/>
                </ListItem>
                <Link component={RouterLink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to="/calculators/bmi">
                    <ListItem key={"199"}>
                        <ListItemButton>
                            <ListItemText primary={"Kalkulator BMI"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to="/calculators/bmr">
                    <ListItem key={"19"}>
                        <ListItemButton>
                            <ListItemText primary={"Kalkulator BMR"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to="/calculators/orm">
                    <ListItem key={"18"}>
                        <ListItemButton>
                            <ListItemText primary={"Kalkulator ORM"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to="/calculators/bfp">
                    <ListItem key={"17"}>
                        <ListItemButton>
                            <ListItemText primary={"Kalkulator BFP"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>


                <Divider/>
                <ListItem key={"26"} disablePadding>
                    <ListItemIcon>
                        <ArticleIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Artykuły"}/>
                </ListItem>
                <Link component={RouterLink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to="/articles/diet">
                    <ListItem key={"15"}>
                        <ListItemButton>
                            <ListItemText primary={"Dieta"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to="/articles/training">
                    <ListItem key={"14"}>
                        <ListItemButton>
                            <ListItemText primary={"Trening"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Divider/>
                <ListItem key={"31"} disablePadding>
                    <ListItemIcon>
                        <ChatIcon/>
                    </ListItemIcon>
                    <ListItemText primary={"Forum"}/>
                </ListItem>
                <Link component={RouterLink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to="/forum/diet">
                    <ListItem key={"13"}>
                        <ListItemButton>
                            <ListItemText primary={"Dieta"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to="/forum/training">
                    <ListItem key={"12"}>
                        <ListItemButton>
                            <ListItemText primary={"Trening"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link component={RouterLink} style={{
                    color: 'inherit',
                    textDecoration: 'none',
                }} to="/forum/beauty">
                    <ListItem key={"11"}>
                        <ListItemButton>
                            <ListItemText primary={"Uroda"}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
            <Divider/>
        </Drawer>
        {open && <Box sx={{marginLeft: "17rem", marginTop: "1rem", display:"flex"}}>{children}</Box>}
        {!open && <Box sx={{marginLeft: "8rem", marginTop: "1rem", display:"flex"}}>{children}</Box>}

    </div>
}

export default SideBar;