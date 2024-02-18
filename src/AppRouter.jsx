import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/Login"; 
import { Inicio } from "./components/Inicio"; 



const AppRouter = () => {
    //const location = useLocation();
    return ( 
    <Router >
        <Routes >
            <Route path = "/login" element={<Login />}/> 
            <Route path = "" element={<Login />}/> 
            <Route path = "/inicio" element={<Inicio />}/> 
        </Routes> 
    </Router>
    );
};

export default AppRouter;