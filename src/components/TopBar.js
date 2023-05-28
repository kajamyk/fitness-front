import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom';

const TopBar = (props) => {
    const {handleDrawerOpen, open} = props;
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem('Auth');
        props.setIsLoggedIn(false);
        navigate('/');
    }
    return <div>
        <AppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{mr: 2, ...(open && {display: 'none'})}}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography>
                    HerFitnessHub
                </Typography>
                <IconButton
                    color="inherit"
                    sx={{ml: 'auto'}}
                    onClick={logoutHandler}
                >
                    <LogoutIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Toolbar/>
    </div>
}
export default TopBar;