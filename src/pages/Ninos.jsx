import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllNinos } from "../services/ninos.js";
import "../styles/styles.css";
import { isAuthenticated } from "../utils/auth";

import Navbar from "../components/Navbar.jsx";
import DetalleNino from "./DetalleNino.jsx";
import Loading from "./Loading .jsx";
import Modal from "./modal.jsx";

const Ninos = () => {
  const [listado, setListado] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emodal, setEmodal] = useState(null);
  const [objetoNino, setObejetoNino] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
    fetchNinos();
  };

  const setModal = (tipo, objeto) => {
    //console.log(" ++ DESDE NINOS  tipo ++  " + JSON.stringify(tipo));
    //console.log("  ++ DESDE NINOS objeto ++ " + JSON.stringify(objeto));
    setEmodal(tipo);
    setObejetoNino(objeto);

    if (tipo == 0 && objeto != 0) {
      setTimeout(() => {
        setIsModalOpen(false);
        fetchNinos();
      }, 500);
    }

    setTimeout(() => {
      setIsModalOpen(true);
    }, 100);
  };

  const fetchNinos = () => {
    getAllNinos()
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
      fetchNinos();
    }, 500);


  
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredUsers = listado.filter((user) =>
    `${user.nombre} ${user.apellido}`.toLowerCase().includes(searchTerm)
  );

  /*  ******************************************************** */

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  // Calcular los índices para los datos paginados
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

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

  return (
    <div className="container-all">
      <Navbar />
      <div className="container-head">
        <div>
          <h2>Niños</h2>
        </div>
        <div className="ancho25">
          <h3>{errorMessage}</h3>
        </div>

        <div className="ancho25">
          <input className="formularioTxt"
            type="text"
            placeholder="Buscar por nombre o apellido"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="ancho25">
          <button className="add-button ancho" onClick={() => setModal(0, 0)}>
            Agregar
          </button>
        </div>
      </div>

      <hr />
      <div className="container-table">
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
            {filteredUsers.length > 0 ? (
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

export default Ninos;
