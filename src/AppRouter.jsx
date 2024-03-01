import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./components/Login"; 
import { Hoteles } from "./components/hoteles"; 
import { Habitaciones } from "./components/habitaciones"; 
import { Hotel_detalle } from "./components/hotel_detalle"; 
import { Fechas } from "./components/fechas"; 
import { Reserva } from "./components/reserva"; 
import { Pago } from "./components/pago"; 



const AppRouter = () => {
    //const location = useLocation();
    return ( 
    <Router >
        <Routes >
            <Route path = "/login" element={<Login />}/> 
            <Route path = "" element={<Login />}/> 
            <Route path = "/hoteles" element={<Hoteles />}/> 
            <Route path = "/habitaciones/*" element={<Habitaciones />}/> 
            <Route path = "/hotelD/*" element={<Hotel_detalle />}/> 
            <Route path = "/fechas/*" element={<Fechas />}/> 
            <Route path = "/reserva/*" element={<Reserva />}/> 
            <Route path = "/pago/*" element={<Pago />}/> 
        </Routes> 
    </Router>
    );
};

export default AppRouter;