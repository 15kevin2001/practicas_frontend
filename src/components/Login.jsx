import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './css/login_styles.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

    const navigate = useNavigate(); 

    useEffect(() => {
        // Verificar si ya existe una sesión al cargar la página
        const sessionData = localStorage.getItem("session");
        if (sessionData) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:9000/api/cliente_login", {
                "usuario": email,
                "password": password
            });
            console.log(response); // No necesitas comillas alrededor de response aquí
            if (response.data.code == 0) {
                console.log("Acceso concedido");
                window.confirm("acceso concedido");
                setIsLoggedIn(true);
                // Guardar la sesión en localStorage
                localStorage.setItem("session", JSON.stringify({ email }));
            } else {
                if(response.data.code == 1){
                    console.log("Acceso denegado");
                    window.confirm("contraseña incorrecta");
                }else{
                    console.log("Acceso denegado");
                    window.confirm("usuario no existe");
                }
                
                // Realiza acciones cuando el inicio de sesión no es exitoso
            }
        } catch (error) {
            console.error("Error en la solicitud: ", error);
        }
    };

    if (isLoggedIn) {
        console.log("isLoggedIn");
        window.location.href = "hoteles";
        /*localStorage.removeItem("session");
        setIsLoggedIn(false);*/
    }

    return (
            <section>
                <div class="login-container">
                    <form id="loginForm">
                        <h1>Quick Stay</h1>
                        <div class="input-container">
                            <i class="fa-solid fa-user"></i>
                            <input type="text" id="username" name="username" 
                            placeholder="Usuario"
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                        </div>
                        
                        <div class="input-container">
                            <i class="fa-solid fa-lock"></i>
                            <input type="password" id="password" name="password"
                             placeholder="Contraseña" 
                             onChange={(e) => setPassword(e.target.value)}
                             required/>
                        </div>
                
                        <div class="buttons-container">
                            <button type="button" onClick={handleLogin}>Iniciar Sesión</button>
                            <button type="button" onClick="Cancelar()">Cancelar</button>
                        </div>
                    </form>
                </div>

                <script src="./login_script.js"></script>
                <script src="https://kit.fontawesome.com/4e7341fe65.js" crossorigin="anonymous"></script>
            </section>
                
    );
};