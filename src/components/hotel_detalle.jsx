import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import './css/hotel_detalle.css';
import Swal from "sweetalert2";

const carpeta_imagenes = require.context("../img_hoteles",true);

export const Hotel_detalle = () => {
  const obj1 = useParams();
  const navigate = useNavigate();
  const cod_hotel = obj1["*"];
  
  const [hotel, setHotel] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const gethotel = async () => {
      try {
          const response = await axios.get("http://localhost:9000/api/hotel_porId?id="+cod_hotel);
          console.log("respuesta")
          console.log(response.data);
          setHotel(response.data);
          setIsLoading(false);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Hotel no encontrado.",
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
          gethotel();
      }
  }, []);


  return (
    <div>
      {isLoading ? ( // Muestra la pantalla de carga si isLoading es true
        <div>Cargando...</div>
      ) : (
        <div className="hotel-details1">
          <div className="hotel-image">
            <img src={carpeta_imagenes("./" + cod_hotel + ".jpg")} alt={hotel.nombre} />
          </div>
          <div className="hotel-info">
            <h2 className="hotel-name">{hotel.nombre}</h2>
            <table className="detail-table">
              <tbody>
                <tr>
                  <td className="detail-label">Dirección:</td>
                  <td>{hotel["direccion"]}</td>
                </tr>
                <tr>
                  <td className="detail-label">Teléfono:</td>
                  <td>{hotel.telefono}</td>
                </tr>
                <tr>
                  <td className="detail-label">Departamento:</td>
                  <td>{hotel.departamento}</td>
                </tr>
                <tr>
                  <td className="detail-label">Provincia:</td>
                  <td>{hotel.provincia}</td>
                </tr>
                <tr>
                  <td className="detail-label">Distrito:</td>
                  <td>{hotel.distrito}</td>
                </tr>
                <tr>
                  <td className="detail-label">Descripción:</td>
                  <td>{hotel.descripcion}</td>
                </tr>
                <tr>
                  <td className="detail-label">Servicios:</td>
                  <td>
                    <ul>
                      {hotel.servicio.split("|").map((servicio, index) => (
                          <li>{servicio}</li>
                        ))}
                    </ul>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

  