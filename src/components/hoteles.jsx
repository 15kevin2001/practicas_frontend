import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './css/styles1.css';

const carpeta_imagenes = require.context("../img_hoteles",true);

export const Hoteles = () => {
    const [hotels, setHotels] = useState({});
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado para controlar si el usuario está autenticado
    const [hotelSeleccionado, setHotelSeleccionado] = useState(null);

    const navigate = useNavigate(); 

    const gethotels = async () => {
        try {
            const response = await axios.get("http://localhost:9000/api/hotel");
            setHotels(response.data);
        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }
    }

    if (!isLoggedIn) {
        window.alert("No tiene sesión activa, inicie sesión");
        console.log("isLoggedIn");
        window.location.href = "Login";
    }

    const logout = () => {
         // Elimina la información de sesión del localStorage
        console.log("logout");
        window.location.href = "login";
        localStorage.removeItem("session");
      };

    useEffect(() => {
        // Verificar si ya existe una sesión al cargar la página
        const sessionData = localStorage.getItem("session");
        if (!sessionData) {
            setIsLoggedIn(false);
        }else{
            gethotels();
        }
    }, []);

    return (
            <section>
                <div>
                    
                </div>
                <header>
                    <h1>HOTELES</h1>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" id="searchInput" placeholder="Buscar destino" />
                    <button onClick={logout}>Buscar</button>
                    <button type="button" onClick={logout}>Cerrar Sesion</button>
                </header>
                <section id="hotelsSection">
                    <div id="hotelList" style={{ maxHeight: "70vh", overflowY: "auto" }}>
                        {Array.isArray(hotels) && hotels.length > 0 ? (
                            hotels.map((hotel, index) => (
                                <div className="hotel-card" key={index}>
                                    <h3>{hotel["nombre"].toUpperCase()}</h3>
                                    <div className="hotel-info">
                                        <img src={carpeta_imagenes("./" + hotel['_id'] + ".jpg")} alt="Hotel A" onClick="" />
                                        <div className="hotel-details">
                                            <p><strong>Departamento: </strong>{hotel["departamento"]}</p>
                                            <p><strong>Dirección: </strong>{hotel["direccion"]}</p>
                                            <p><strong>Teléfono: </strong>{hotel["telefono"]}</p>
                                            <p><strong>Distrito: </strong>{hotel["departamento"]}/{hotel["provincia"]}/{hotel["distrito"]}</p>
                                            <div style={{ display: "flex", gap: "10px" }}>
                                                <button><Link to={`/habitaciones/${hotel._id}`}>Reservar</Link></button>
                                                <button><Link to={`/hotelD/${hotel._id}`}>Ver detalles</Link></button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div></div>
                        )}
                    </div>
                </section>
            </section>
                
    );
};

export default Hoteles;