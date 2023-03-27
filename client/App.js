import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import MainPage from './components/MainPage';
import Login from './components/Login';
import SignUp from './components/Signup';
import GameList from './components/GameList';
import CarMain from './components/CarMain';

import './css/Splash.css'

const App = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path = '/' element = {<MainPage />}>
                    <Route path = '/gamelist' element = {<GameList />} /> 
                </Route> 
                <Route path = '/login' element = {<Login />} />
                <Route path = '/signup' element = {<SignUp />} />
                <Route path = '/carmain' element = {<CarMain />} />
            </Routes>
        </BrowserRouter>
    )
}


export default App;