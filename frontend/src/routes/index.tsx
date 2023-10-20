import React from 'react';
import { BrowserRouter, Route,Router, Routes } from 'react-router-dom';
import Approve from '../pages/approve';
import Approved from '../pages/approved';
import Request from '../pages/request';


function AppRoutes() {
    return(
        <Routes>
            <Route path='/' element={<Request/>}></Route>
            <Route path='/approve/:cid' element={<Approve/>}></Route>
            <Route path='/approved' element={<Approved/>}></Route>
        </Routes>
    );
}

export default AppRoutes;