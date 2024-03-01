import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './css/styles1.css';
import Swal from "sweetalert2";

const carpeta_imagenes = require.context("../img_habitacion",true);

export const Fechas = () => {
  const obj1 = useParams();
  const navigate = useNavigate();
  
  const arreglo = obj1["*"].split("/");
  const cod_hotel = arreglo[0];
  const categoria = arreglo[1];
  
  const [habitacion, setHabitacion] = useState({});
  const [fechaIni, setFechaIni] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const gethabitacion = async () => {
      try {
          const response = await axios.get("http://localhost:9000/api/habitacion_porCategoria?id="+cod_hotel+"&tipo="+categoria);
          console.log(response.data);
          setHabitacion(response.data);
          setIsLoading(false);
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
      if (!sessionData) {
          setIsLoggedIn(false);
      }else{
          gethabitacion();
      }
  }, []);


  return (
    <div>
      {isLoading ? ( // Muestra la pantalla de carga si isLoading es true
        <div>Cargando...</div>
      ) : (
        <div>
          <section class="banner_fechas">
            <header>
                <h1>{habitacion[0]["tipo_habitacion"]}</h1>
                <img class="fecha_img" src={carpeta_imagenes("./" + habitacion[0]["tipo_habitacion"].toUpperCase() + ".jpg")} alt="Hotel A" onClick="" />
            </header>
            <section>
            <ul>
                <li>{habitacion[0]["cantidad_camas"].toString()} Cama - {habitacion[0]["tipo_camas"]}</li>
                <li><strong>Tamaño de habitación: </strong>{habitacion[0]["metros"].toString()} m2</li>
                <li><strong>Precio para 1 noche, 2 adultos y 2 niños</strong></li>
                <li><strong>S/ {habitacion[0]["precio"].toString()}</strong></li>
              </ul>

              

            </section>
            <section>
            <form>
                <section>
                <label for="fecha">Fecha de llegada:</label>
                <input type="date" id="fecha" name="fecha" onChange={(e) => setFechaIni(e.target.value)}
                             required/></section>
                <section>
                <label for="fecha">Fecha de salida:</label>
                <input type="date" id="fecha" name="fecha" onChange={(e) => setFechaFin(e.target.value)}
                             required/></section>
              </form>
            </section>
            <section><h3>Servicios</h3></section>
            <section>
            <table>
                <tbody>
                  <tr>
                    <td>
                      <ul>
                        {habitacion[0]["servicio"].split("|").map((servicio, index) => (
                            <li>{servicio}</li>
                          ))}
                      </ul>
                    </td>  
                  </tr>
                </tbody>
              </table>
            </section>
            <section>

              <div>
                <button>
                    <Link to={`/reserva/${cod_hotel}/${categoria}/${fechaIni}/${fechaFin}`}>Reservar</Link>
                </button>
                <button onClick={()=>{navigate(-1)}}>
                  Volver
                </button>
              </div>
            </section>
          </section>

        </div>

      )}
    </div>
  );
};

  