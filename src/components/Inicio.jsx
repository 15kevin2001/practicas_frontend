import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './login_styles.css';

export const Inicio = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Estado para controlar si el usuario está autenticado

    const navigate = useNavigate(); 

    useEffect(() => {
        // Verificar si ya existe una sesión al cargar la página
        const sessionData = localStorage.getItem("session");
        if (!sessionData) {
            setIsLoggedIn(false);
        }
    }, []);


    if (!isLoggedIn) {
        window.alert("No tiene sesión activa, inicie sesión");
        console.log("isLoggedIn");
        window.location.href = "Login";
        /*localStorage.removeItem("session");
        setIsLoggedIn(false);*/
    }

    return (
            <section>
                <div class="login-container">
                    
                </div>

                <script src="https://kit.fontawesome.com/4e7341fe65.js" crossorigin="anonymous"></script>
            </section>
                
    );
};