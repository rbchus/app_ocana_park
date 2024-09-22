import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import { getAllJuegos, updateJuego } from "../services/juegos.js";
import "../styles/styles.css";
import { isAuthenticated } from "../utils/auth";

import DetalleJuego from "./DetalleJuego.jsx";
import Modal from "./modal.jsx";

const Juegos = () => {
  const [listado, setListado] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emodal, setEmodal] = useState(null);
  const [objetoNino, setObejetoNino] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [pintarDatos, setPintarDatos] = useState(0);

  
  const convertirASegundos = (tiempo) => {
    const [horas, minutos, segundos] = tiempo.split(":").map(Number);
    return horas * 3600 + minutos * 60 + (segundos || 0); // Si no hay segundos, asumimos 0
  };

  const convertirATiempo = (segundosTotales) => {
    const horas = Math.floor(segundosTotales / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;
    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
  };

  const sumarTiempo = (opcion) => {
    const tiempoActual = new Date();
    const tiempoFormateado = convertirATiempo(
      tiempoActual.getHours() * 3600 +
        tiempoActual.getMinutes() * 60 +
        tiempoActual.getSeconds()
    );

    let rta = 0;
    switch (opcion) {
      case 1:
        rta = convertirASegundos(tiempoFormateado) + 900;
        break;
      case 2:
        rta = convertirASegundos(tiempoFormateado) + 1800;
        break;
      case 3:
        rta = convertirASegundos(tiempoFormateado) + 3600;
        break;
    }

    return convertirATiempo(rta);
  };


  const outJuego = (idJuego, tiempo) => {
    console.log(" sacar juegio " + idJuego);

    const tiempoActual = new Date();
    const tiempoFormateado = convertirATiempo(
      tiempoActual.getHours() * 3600 +
        tiempoActual.getMinutes() * 60 +
        tiempoActual.getSeconds()
    );


    let objetoEnviar = {
      estado: 3,
      tiempo_inicial: tiempoFormateado,
      tiempo_final: sumarTiempo(parseInt(tiempo)),
    };

    console.log(" ENVIAR API     " + JSON.stringify(objetoEnviar));

    updateJuego(idJuego, objetoEnviar)
      .then((response) => {
        console.log(" ---- response ----    " + JSON.stringify(response));
        if (response.status) setRta(response.data.message);
        else setRta(response.message);
      })
      .catch((error) => {
        console.log("Error    " + error);
        setRta(response.data.message);
      });
    

    setTimeout(() => {
      fetchJuegos();
    }, 300);

  
  }

  const setActivo = (juego, tiempo) => {
    console.log(" ACTIVAR JUEGO " + juego);
    console.log(" CON EL TIEMPO  " + tiempo);

    const tiempoActual = new Date();
    const tiempoFormateado = convertirATiempo(
      tiempoActual.getHours() * 3600 +
        tiempoActual.getMinutes() * 60 +
        tiempoActual.getSeconds()
    );

    console.log(" hora inicial  " + tiempoFormateado);
    console.log(" hora final  " + sumarTiempo(parseInt(tiempo)));

    let objetoEnviar = {
      estado: 1,
      tiempo_inicial: tiempoFormateado,
      tiempo_final: sumarTiempo(parseInt(tiempo)),
    };

    updateJuego(juego, objetoEnviar)
      .then((response) => {
        console.log(" ---- response ----    " + JSON.stringify(response));
        if (response.status) setRta(response.data.message);
        else setRta(response.message);
      })
      .catch((error) => {
        console.log("Error    " + error);
        setRta(response.data.message);
      });
    console.log(" ENVIAR API     " + JSON.stringify(objetoEnviar));

    setTimeout(() => {
      fetchJuegos();
    }, 300);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchJuegos();
  };

  const setModal = (tipo, objeto) => {
    console.log(" ++ DESDE NINOS  tipo ++  " + JSON.stringify(tipo));
    console.log("  ++ DESDE NINOS objeto ++ " + JSON.stringify(objeto));
    setEmodal(tipo);
    setObejetoNino(objeto);

    if (tipo == 0 && objeto != 0) {
      setTimeout(() => {
        setIsModalOpen(false);
        fetchJuegos();
      }, 500);
    }

    setTimeout(() => {
      setIsModalOpen(true);
    }, 100);
  };

  const fetchJuegos = () => {
    function obtenerFechaActual() {
      const hoy = new Date();
      const año = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, por eso se suma 1
      const dia = String(hoy.getDate()).padStart(2, "0");

      return `${año}-${mes}-${dia} 01:00:00`;
    }

    console.log(" * obtenerFechaActual() *    " + obtenerFechaActual());
    getAllJuegos(obtenerFechaActual())
      .then((response) => {
        //console.log(" * response *    " + JSON.stringify(response));
        setListado(response.datos);
        setErrorMessage(response.message);
      })
      .catch((error) => {
        console.log("Error servicio  " + error);
        setErrorMessage("Error servicio  ");
      });
  };

  useEffect(() => {
    
    setTimeout(() => {
      fetchJuegos();
    }, 300);


  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  let filteredUsers = listado.filter((user) =>
    `${user.nombre} ${user.apellido}`.toLowerCase().includes(searchTerm)
  );

  /*  ******************************************************** */

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Calcular los índices para los datos paginados
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  //console.log(" * currentItems *    " + JSON.stringify(currentItems));
  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  /* *********************************************************** */

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleJugando = () => {
    console.log(" * mostrar ninos juegando y terminado *   ");
    setPintarDatos(1)
  };

  const handleActivo = () => {
    console.log(" * mostrar ninos  por activar*   ");
    setPintarDatos(0)
  };


  useEffect(() => {
    
  }, []);

  return (
    <div className="container-all">
       <Navbar />
       <div className="container-head">
        <div >
          <h2>Juegos</h2>
        </div>
        <div className="ancho20">
          <h3>{errorMessage}</h3>
        </div>

        <div className="ancho20">
          <input className="formularioTxt"
            type="text"
            placeholder="Buscar por nombre o apellido"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="ancho20">
          <button className="add-button" onClick={handleActivo}>
            Inicar
          </button>
        </div>

        <div className="ancho20">
          <button className="delete-button" onClick={handleJugando}>
            Jugando
          </button>
        </div>
      </div>
      <hr />
      <div className="container-table">
        <table>
          <thead>
            <tr className="alto">
              <th>Zona</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Celular</th>
              <th>Tiempo </th>
              <th>Inicial</th>
              <th>Final</th>
              <th>Restante</th>
              <th>Extra</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              currentItems.map((item) => (
                item.estado == pintarDatos? (
                <DetalleJuego
                  id_juego={item.id_juego}
                  estado={item.estado}
                  id_tiempo={item.id_tiempo}
                  zona={item.zona}
                  nombre={item.nombre}
                  apellido={item.apellido}
                  celular={item.celular}
                  time={item.tiempo}
                  inicial={item.tiempo_inicial}
                  final={item.tiempo_final}
                  modal={setActivo}
                  liberar={outJuego}
                />
              ):(<></>)
              ))
            ) : (
              <tr>
                <th> ... CARGANDO DATOS ....</th>
              </tr>
            )}
          </tbody>

          <div className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </table>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          tipo={emodal}
          nino={objetoNino}
          modal={setModal}
        />
      </div>
    </div>
  );
};

export default Juegos;
