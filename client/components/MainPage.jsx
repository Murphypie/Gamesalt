import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import TopContainer from "./TopContainer";
import Navigation from "./Navigation";
import GameList from "./GameList";
import GameDisplay from "./GameDisplay";
import SplashPage from "./SplashPage";

const MainPage = () => {
    return (
        <div className="main-container">
            <div className="top-side">
                <TopContainer />
                <Link to= "/login">Log in</Link>
                <br></br>
                {/* <Link to= "/carmain">Go to Neuro Car</Link> */}
            </div>
            <div className="left-side">
                <Navigation />
            </div>
            <div className="right-side">
                <Routes>
                    <Route path = '/' element = {<SplashPage />} /> 
                    <Route path = '/gamedisplay' element = {<GameDisplay />} /> 
                </Routes>
            </div>
        </div>
    );
};

export default MainPage;
