import TopBar from "./TopBar";
import SideBar from './SideBar'
import {useState} from "react";


const Navigation = (props) => {
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(prevState => !prevState);
    }
    return <div>
        <TopBar open={open} handleDrawerOpen={handleDrawerOpen} setIsLoggedIn={props.setIsLoggedIn}/>
        <SideBar open={open} handleDrawerClose={handleDrawerOpen} >
            {props.children}
        </SideBar>
    </div>
}
export default Navigation;