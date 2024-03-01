import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './css/hotel_detalle.css';
import Swal from "sweetalert2";

const carpeta_imagenes = require.context("../img_habitacion",true);

export const Habitaciones = () => {
  const obj1 = useParams();
  const navigate = useNavigate();
  const cod_hotel = obj1["*"];
  
  const [habitacion, setHabitacion] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getHabitacion = async () => {
      try {
          const response = await axios.get("http://localhost:9000/api/habitacion_porHotel?id="+cod_hotel);
          console.log("respuesta")
          console.log(response.data);
          setHabitacion(response.data);
          setIsLoading(false);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Habitaciones no encontradas del hotel " + cod_hotel,
          icon: "info",
          confirmButtonText: "Cerrar"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(-1);
          }
        });
      }
  }

  if (!isLoggedIn) {
      alert("No tiene sesión activa, inicie sesión");
      window.location.href = "Login";
  }

  useEffect(() => {
      // Verificar si ya existe una sesión al cargar la página
      const sessionData = localStorage.getItem("session");
      if (!sessionData) {
          setIsLoggedIn(false);
      }else{
          getHabitacion();
      }
  }, []);


  return (
    <div>
      {isLoading ? ( // Muestra la pantalla de carga si isLoading es true
        <div>Cargando...</div>
      ) : (
        <section id="hotelsSection">
            <div id="hotelList">
                {Array.isArray(habitacion) && habitacion.length > 0 ? (
                  habitacion.map((hab, index) => (
                    <div class="hotel-card">
                        <h3>{hab["tipo_habitacion"].toUpperCase()}</h3>
                        <div class="hotel-info">
                          <img src={carpeta_imagenes("./" + hab["tipo_habitacion"].toUpperCase() + ".jpg")} alt="Hotel A" onClick="" />
                            <div class="hotel-details">
                                <p>{hab["cantidad_camas"]} camas - {hab["tipo_camas"]}</p>
                                <p><strong>Tamaño de habitación: </strong>{hab["metros"].toString()} m2</p>
                                <p><strong>Precio para 1 noche, 2 adultos y 2 niños</strong></p>
                                <p><strong>S/ {hab["precio"].toString()}</strong></p>
                                <div><button>
                                  <Link to={`/fechas/${hab.id_hotel}/${hab.tipo_habitacion}`}>Reservar</Link>
                                    </button></div>
                            </div>
                        </div>
                    </div>
                  ))
              ) : (
                  <div></div>
              )}
            </div>
          </section>
        )}
      </div>
  );
};