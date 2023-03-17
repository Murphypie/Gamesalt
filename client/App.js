import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import MainPage from './components/mainPage';
import Login from './components/login';
import SignUp from './components/signup';

const App = () =>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path = '/' element = {<MainPage />} />
                <Route path = '/login' element = {<Login />} />
                <Route path = '/signup' element = {<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

/*
<Route path="/users" element={<UsersPage />}>
          <Route path="/" element={<AllUsersPage />} />
          <Route path=":id" element={<SingleUserPage />} />
</Route>
You can define Route components within any component in your component tree. When a Route component is defined within another component, it will only be rendered when its parent component is rendered
*/

export default App;