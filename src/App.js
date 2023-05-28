import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/register/RegisterPage'
import ArticleListPage from "./pages/articles/ArticleListPage";
import ArticlePage from "./pages/articles/ArticlePage";
import ForumPage from "./pages/forum/ForumPage";
import ForumListPage from "./pages/forum/ForumListPage";
import {ThemeProvider} from "@mui/material";
import {theme} from "./theme";
import Navigation from "./components/Navigation";
import React, {useState} from 'react';
import BMICalculator from "./pages/calculators/BMICalculator";
import BMRCalculator from "./pages/calculators/BMRCalculator";
import ORMCalculator from "./pages/calculators/ORMCalculator";
import BFPCalculator from "./pages/calculators/BFPCalculator";
import NotFound from "./pages/NotFound";
const App = () => {
    const authValue = localStorage.getItem('Auth');
    const [isLoggedIn, setIsLoggedIn] = useState(authValue !== '' && authValue !== null);
    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/articles/:category" element={isLoggedIn ? <Navigation setIsLoggedIn={setIsLoggedIn}><ArticleListPage/></Navigation> : <NotFound/>}/>
                        <Route path="/articles/:category/:id" element={isLoggedIn ? <Navigation setIsLoggedIn={setIsLoggedIn}><ArticlePage/></Navigation> : <NotFound/>}/>
                        <Route path="/forum/:category/:id" element={isLoggedIn ? <Navigation setIsLoggedIn={setIsLoggedIn}><ForumPage/></Navigation> : <NotFound/>}/>
                        <Route path="/forum/:category" element={isLoggedIn ? <Navigation setIsLoggedIn={setIsLoggedIn}><ForumListPage/></Navigation> : <NotFound/>}/>
                        <Route path="/calculators/bmi" element={isLoggedIn ? <Navigation setIsLoggedIn={setIsLoggedIn}><BMICalculator/></Navigation> : <NotFound/>}/>
                        <Route path="/calculators/bmr" element={isLoggedIn ? <Navigation setIsLoggedIn={setIsLoggedIn}><BMRCalculator/></Navigation> : <NotFound/>}/>
                        <Route path="/calculators/orm" element={isLoggedIn ? <Navigation setIsLoggedIn={setIsLoggedIn}><ORMCalculator/></Navigation> : <NotFound/>}/>
                        <Route path="/calculators/bfp" element={isLoggedIn ? <Navigation setIsLoggedIn={setIsLoggedIn}><BFPCalculator/></Navigation> : <NotFound/>}/>
                        <Route path="/*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}
export default App;