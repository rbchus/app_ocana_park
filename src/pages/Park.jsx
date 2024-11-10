import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import { getAllJuegos, updateJuego } from "../services/juegos.js";
import { getAllNinos } from "../services/ninos.js";
import "../styles/stylesv2.css";
import { isAuthenticated } from "../utils/auth";

import Card from "./Card.jsx";
import DetalleNino from "./DetalleNino.jsx";

import Loading from "./Loading .jsx";
import Modal from "./modal.jsx";

const Park = () => {


  const [pantalla, setPantalla] = useState(0);
  const [listado, setListado] = useState([]);
;

  
  const [errorMessage, setErrorMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emodal, setEmodal] = useState(null);
  const [objetoNino, setObejetoNino] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pintarDatos, setPintarDatos] = useState(0);
  const [continuar, setContinuar] = useState(null);
  const [rta, setRta] = useState("");
  const [loading ,  setLoading] = useState(true);

 
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
    //console.log(" sacar juegio " + idJuego);
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
    }

    //console.log(" ENVIAR API     " + JSON.stringify(objetoEnviar));

    updateJuego(idJuego, objetoEnviar)
      .then((response) => {
        //console.log(" ---- response ----    " + JSON.stringify(response));
        if (response.status) setRta(response.data.message);
        else setRta(response.message);
      })
      .catch((error) => {
        //console.log("Error    " + error);
        setRta(response.data.message);
      });


    setTimeout(() => {
      fetchJuegos()
    }, 300);
  };


  const setTitulo = (estado) => {
    //  console.log (" estado " + estado)
    if (estado == 0) {
      setErrorMessage(" NIÑOS POR INICIAR ");
    } else {
      setErrorMessage(" NIÑOS JUGANDO");
    }
  };

  const setActivo = (juego, tiempo) => {
    //console.log(" ACTIVAR JUEGO " + juego);
    // console.log(" CON EL TIEMPO  " + tiempo);

    const tiempoActual = new Date();
    const tiempoFormateado = convertirATiempo(
      tiempoActual.getHours() * 3600 +
        tiempoActual.getMinutes() * 60 +
        tiempoActual.getSeconds()
    );

    //console.log(" hora inicial  " + tiempoFormateado);
    //  console.log(" hora final  " + sumarTiempo(parseInt(tiempo)));

    let objetoEnviar = {
      estado: 1,
      tiempo_inicial: tiempoFormateado,
      tiempo_final: sumarTiempo(parseInt(tiempo)),
    };

    updateJuego(juego, objetoEnviar)
      .then((response) => {
        //console.log(" ---- response ----    " + JSON.stringify(response));
        if (response.status) setRta(response.data.message);
        else setRta(response.message);
      })
      .catch((error) => {
        //console.log("Error    " + error);
        setRta(response.data.message);
      });
    // console.log(" ENVIAR API     " + JSON.stringify(objetoEnviar));

    setTimeout(() => {
      fetchJuegos()
    }, 300);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    
  };

  const setModal = (tipo, objeto, patalla) => {
   // console.log(" ++ tipo++  " + tipo);
   // console.log(" ++ patalla++  " + patalla);
    //console.log(" ++ patalla++  " + patalla);
    // console.log("  ++ DESDE NINOS objeto ++ " + JSON.stringify(objeto));
    setEmodal(tipo);
    setObejetoNino(objeto);

    if (tipo <= 0 && objeto != 0) {
      setTimeout(() => {
        setIsModalOpen(false);
        fetchNinos()
      }, 100);
    }

  
    setIsModalOpen(true);
/*
    setTimeout(() => {
      setIsModalOpen(true);
    }, 100);

*/
  };

  function obtenerFechaActual() {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, por eso se suma 1
    const dia = String(hoy.getDate()).padStart(2, "0");

    return `${año}-${mes}-${dia} 01:00:00`;
  }

  const fetchJuegos = () => {
    getAllJuegos(obtenerFechaActual())
      .then((response) => {
        if (response.status) {
          setListado(response.datos.datos);
          setErrorMessage(response.datos.datos.message || "Juegos ok.");
        } else {
          setListado([]);
          setErrorMessage(response.datos.datos.message || "Sin Juegos.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener juegos:", error);
        setErrorMessage("Error en el servicio. Por favor, inténtelo más tarde.");
      });
  };


  const fetchNinos = async () => {
    setErrorMessage(""); // Clear previous error messages
    setLoading(true); // Set loading state to true
  
    try {
      const response = await getAllNinos(); // Call the function to fetch children
  
      if (response) {
        //console.log(" * response  status *    ", response.datos.status);
        //console.log(" * response  datos *    ", response.datos.datos);
        //console.log(" * response  message *    ", response.datos.message);
  
        if (response.datos.status && Array.isArray(response.datos.datos)) {
          setListado(response.datos.datos); // Update state with fetched data
          filteredUsers= response.datos.datos
          setErrorMessage(response.datos.message); // Update success message
        } else {
          setErrorMessage(response.datos.message || "No se encontraron niños."); // Handle no data case
        }
      } else {
        setErrorMessage("No se obtuvo respuesta del servidor."); // Handle null response
      }
    } catch (error) {
      console.error("Error en servicio: ", error);
      setErrorMessage("Error en el servicio. Por favor, inténtelo más tarde."); // Generic error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  /*

  const filteredUsers = Array.isArray(listado)
  ? listado.filter((user) =>
      `${user.nombre} ${user.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];
*/

let  filteredUsers = listado.filter((user) =>
  `${user.nombre} ${user.apellido}`.toLowerCase().includes(searchTerm)
 );

  useEffect(() => {
  
  }, []);

  useEffect(() => {
    //console.log ("listado.length  " + listado.length )
    //console.log ("listado   " + JSON.stringify(listado))
  
  }, []);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    paginate(1)
  };


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
    } else {
      fetchJuegos(); // O cualquier otra función de carga inicial que necesites
    }
  }, [navigate]);




  const handleJugando = () => {
    // console.log(" * mostrar ninos juegando y terminado *   ");
    setPintarDatos(1);
  };

  const handleActivo = () => {
    setErrorMessage(" NIÑOS X ACTIVAR");
    // console.log(" * mostrar ninos  por activar*   ");
    setPintarDatos(0);
  };

  useEffect(() => {
    setListado([])
    switch (pantalla) {
      case 1: fetchNinos()
        break;
      case 2: fetchJuegos();
        break;
    }
  }, [pantalla]);

  //----------------------
  const SetOption = (opc) => {
    //console.log(" ...................... SetOption ..." + opc);
    setPantalla(opc);
  };

  const pintarHead = (opc) => {
    switch (opc) {
      case 1:
        return (


          <div className="container-head">
            
            <div className="ancho25">
              <h3>{errorMessage}</h3>
            </div>

            <div className="ancho25">
              <input
                className="formularioTxt"
                type="text" 
                placeholder="Buscar por nombre o apellido"
                value={searchTerm}
                onChange={handleSearchChange}
                
              />
            </div>

            <div className="ancho25">
              <button
                className="add-button ancho"
                onClick={() => setModal(0, 0, 1)}
              >
                Agregar
              </button>
            </div>
          </div>
        );
        break;
      case 2:
        return (
          <div className="container-head">
  
            <div className="ancho20">
              <h3>{errorMessage}</h3>
            </div>

            <div className="ancho20">
              <input
                className="formularioTxt"
                type="text"
                placeholder="Buscar por nombre o apellido"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="ancho20">
              <button className="add-button" onClick={handleActivo}>
               Activar
              </button>
            </div>

            <div className="ancho20">
              <button className="delete-button" onClick={handleJugando}>
                Jugando
              </button>
            </div>
          </div>
        );
        break;
      case 0:
        return <></>;
        break;
    }
  };




  const pintarTabla = (opc) => {
    switch (opc) {
      case 1:
        return (
          <div> 
            <br/>
          <table>
            <thead>
              <tr className="alto">
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Genero</th>
                <th>Celular</th>
                <th>Nacimiento</th>
                <th>Edad</th>
                <th>Ingreso</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listado.length  > 0 ? (
                currentItems.map((item) => (
                  <DetalleNino
                    key={item.id_nino}
                    id={item.id_nino}
                    nombre={item.nombre}
                    apellido={item.apellido}
                    genero={item.genero}
                    celular={item.celular}
                    nacimiento={item.nacimiento}
                    ingreso={item.fecha_registro}
                    modal={setModal}
                  />
                ))
              ) : (
                <Loading />
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
          </div>
        );
        break;
      case 2:
        return (
          <div> 
            <br/>
          <div class="cards">
          
              {listado.length  > 0  ? (
                currentItems.map((item) =>
                  item.estado == pintarDatos ? (
                    <Card
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
                      msjTitulo={setTitulo}
                    />
                  ) : (
                    <></>
                  )
                )
              ) : (
                <Loading />
              )}
         

         
          </div>

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

          </div>
        );
        break;

      case 0:
        return (
          <div className="container-login">
            <img className="logoGrande" src="./img/ocanaPark_blue.svg" />
          </div>
        );
        break;
    }
  };

 

  //----------------------
  return (
    <>
 
      <Menu SetOption={SetOption} />
      {pintarHead(pantalla)}
      <hr />
      <main class="main-content">
        {pintarTabla(pantalla)}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          tipo={emodal}
          nino={objetoNino}
          modal={setModal}
        />
      </main>
   
    </>
  );
};

export default Park;
