import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import MainPage from './components/mainPage';

const App = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path = '/' element = {<MainPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;