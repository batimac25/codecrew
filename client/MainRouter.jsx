import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import React from 'react'
//import {Route, Routes} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './lib/Signin.jsx'
import Profile from './user/Profile.jsx'
import Switch from 'react'
import PrivateRoute from './lib/PrivateRoute.jsx'
import EditProfile from './user/EditProfile.jsx'
import Menu from './core/Menu'
import CardList from './card/ListCards'; 
import CreateCard from './card/CreateCard'; 
import EditCard from './card/EditCard'; 
import DeleteCard from './card/DeleteCard'; 

function MainRouter() {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route
                    path="/user/edit/:userId"
                    element={
                        <PrivateRoute>
                            <EditProfile />
                        </PrivateRoute>
                    }
                />
                <Route path="/user/:userId" element={<Profile />} />

                <Route path="/cards" element={<PrivateRoute><CardList /></PrivateRoute>} />
                <Route path="/card/add" element={<PrivateRoute><CreateCard /></PrivateRoute>} />
                <Route path="/card/edit/:cardId" element={<PrivateRoute><EditCard /></PrivateRoute>} />
                <Route path="/card/delete/:cardId" element={<PrivateRoute><DeleteCard /></PrivateRoute>} />
            </Routes>
        </div>
    );
}

export default MainRouter;

