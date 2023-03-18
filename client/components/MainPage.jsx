import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import TopContainer from "./TopContainer";
import Navigation from "./navigation";
import GameList from "./GameList";
import SplashPage from "./SplashPage";

const MainPage = () => {
    return (
        <div className="main-container">
            <div className="top-side">
                <TopContainer />
                <Link to= "/login">Log in</Link>
            </div>
            <div className="left-side">
                <Navigation />
            </div>
            <div className="right-side">
                <Routes>
                    <Route path = '/' element = {<SplashPage />} /> 
                    <Route path = '/gamelist' element = {<GameList />} /> 
                </Routes>
            </div>
        </div>
    );
};

export default MainPage;
