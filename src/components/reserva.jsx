import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import './css/styles1.css';
import './css/estilos.css';
import Swal from "sweetalert2";


const carpeta_imagenes = require.context("../img_habitacion",true);

export const Reserva = () => {
  const obj1 = useParams();
  const navigate = useNavigate();
  
  
  const arreglo = obj1["*"].split("/");
  const cod_hotel = arreglo[0];
  const cod_hab = cod_hotel.split("-")[0];
  const categoria = arreglo[1];
  const fechaIni = arreglo[2];
  const fechaFin = arreglo[3];
  
  const [habitacion, setHabitacion] = useState({});
  const [hotel, setHotel] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  var cod_cliente = ""

  const gethabitacion = async () => {
      try {
          const response = await axios.get("http://localhost:9000/api/habitacion_porCategoria?id="+cod_hotel+"&tipo="+categoria);
          console.log(response.data);
          console.log(response.data[0])
          setHabitacion(response.data[0]);
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Habitaciones no encontrado.",
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
      console.log(sessionData)
      if (!sessionData) {
          setIsLoggedIn(false);
      }else{
        cod_cliente = sessionData.email
          gethabitacion().then(async ()=>{
              const response2 = await axios.get("http://localhost:9000/api/hotel_porId?id="+cod_hab);
            setHotel(response2.data);
            setIsLoading(false);
          });
      }
  }, []);

  const reservar = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:9000/api/reserva", 
      { id_cliente: cod_cliente,
      id_hotel: cod_hotel,
      fechaIni: Date(fechaIni),
      fechaFin: Date(fechaFin),
      precio: dias_reservados(fechaIni,fechaFin) * habitacion.precio});
      if (response) {
        console.log(response.data);
        navigate(`/pago/${response.data.reserva._id}`);
        //setIsLoading(false);
      }
    } catch (error) {
      console.error("Error en la solicitud: ", error);
      //setIsLoading(false);
    }
  }

  const dias_reservados = (fecha1Str,fecha2Str) => {
    const fecha1 = new Date(fecha1Str);
    const fecha2 = new Date(fecha2Str);

    const unDiaEnMS = 24 * 60 * 60 * 1000; // 1 día en milisegundos
    const diferenciaEnMS = Math.abs(fecha2 - fecha1); // Diferencia en milisegundos
    const diasPasados = Math.ceil(diferenciaEnMS / unDiaEnMS); 
    return diasPasados + 1;
  }


  return (
    <div>
      {isLoading ? ( // Muestra la pantalla de carga si isLoading es true
        <div>Cargando...</div>
      ) : (
        <div style={{background:"white"}}>
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
        
        <main>
            <section class="detalle-reserva">
                <div class="texto">
                    <p>{hotel.nombre.toUpperCase()}-{hotel.departamento}</p>
                    <p>{hotel.direccion}</p>
                    <p>N° de reserva: 00501 </p>
                    <p>{habitacion.tipo_habitacion}</p>
                    <p>Fecha de entrada: {fechaIni} </p>
                    <p>Fecha de Salida: {fechaFin}</p>
                    <p>{dias_reservados(fechaIni,fechaFin)} noche </p>
                    <p>Precio: S/. {dias_reservados(fechaIni,fechaFin) * habitacion.precio} </p>             
                </div>
            </section>
        </main>

        <nav>
            <button href="#" onClick={()=>{reservar()}}>Confirmar reserva</button>
        </nav>
        <nav>
            <b href="#">Cancelar</b>
        </nav>

            </div>

          )}
    </div>
  );
};

  