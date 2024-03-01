import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import './css/hotel_detalle.css';
import Swal from "sweetalert2";

const carpeta_imagenes = require.context("../img_hoteles",true);

export const Pago = () => {
  const obj1 = useParams();
  const navigate = useNavigate();
  const cod = obj1["*"];
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  if (!isLoggedIn) {
      alert("No tiene sesión activa, inicie sesión");
      window.location.href = "Login";
  }

  const logout = () => {
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
        setIsLoading(false);
      }
  }, []);


  return (
    <div>
      {isLoading ? ( // Muestra la pantalla de carga si isLoading es true
        <div>Cargando...</div>
      ) : (
          <body>
    <header>
        <section class="textos-header">
            <h1>QUICK STAY</h1>
        </section>
        <div class="wave" style={{height: "150px", overflow: "hidden"}} >
                <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: "100%", width: "100%"}}>
                    <path d="M-0.84,100.17 C130.64,148.53 349.20,-49.98 500.27,107.08 L500.00,150.00 L0.00,150.00 Z" style={{stroke: "none", fill: "#ffffff"}}>
                    </path>
                </svg>
              </div>
    </header>

    <form>
        <section class="monto-pago"> 
            <h2>Monto a pagar: S/.</h2>
            <h2>700</h2>
        </section>

        <div class="formulario">
            <label for="numero_tarjeta">Número de Tarjeta:</label>
            <input type="text" id="numero_tarjeta" name="numero_tarjeta" pattern="[0-9]{16}" placeholder="Ingrese el número de tarjeta" required/>
          
            <label for="fecha_expiracion">Fecha de Expiración:</label>
            <input type="text" id="fecha_expiracion" name="fecha_expiracion" pattern="(0[1-9]|1[0-2])\/[0-9]{2}" placeholder="MM/YY" required/>
          
            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" pattern="[0-9]{3,4}" placeholder="Ingrese el CVV" required/>
          
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" placeholder="Ingrese su nombre" required/>
        </div>
    </form>
    
    <nav>
        <a1 href="#">Pagar</a1>
    </nav>
    <nav>
        <a2 href="#">Volver</a2>
    </nav>
    <nav>
        <a3 href="#">Calcelar</a3>
    </nav>
</body>
      )}
    </div>
  );
};

  