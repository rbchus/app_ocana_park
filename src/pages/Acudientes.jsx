import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllAcudientes } from "../services/acudientes.js";
import '../styles/styles.css';
import { isAuthenticated } from '../utils/auth';

import DetalleAcudiente from './DetalleAcudiente.jsx';
import Modal from './modal.jsx';


const Acudientes = () => {

  const [listado , setListado ] = useState([])
  const [errorMessage, setErrorMessage] = useState('');
  const [statusCode, setStatusCode] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emodal , setEmodal ] = useState(null)

  const closeModal = () => {
    setIsModalOpen(false);
  };
  

  const setModal = (tipo, id) => {
    setEmodal(tipo)
    if (tipo == 0 || tipo == 1) {
      getProducto(id).then ((response) => {
         setProductoEditar(response.data.datos[0])

        
         
     })
     .catch ((error) => {
         console.log ("Error servicio  " + error)
         setErrorMessage("Error servicio  " + error);
     })

    }


   
    setTimeout(() => {
      setIsModalOpen(true);
    }, 300);
   
  };

  useEffect(() => {
    getAllAcudientes().then ((response) => {
       // console.log (" response  " + JSON.stringify(response))

      // console.log (" * response *    " + JSON.stringify(response))

       setListado(response.datos)
       setErrorMessage(response.message)

        


    })
    .catch ((error) => {
      console.log ("Error servicio  " + error)
      setErrorMessage("Error servicio  " );
    })
}, [])


 /*  ******************************************************** */ 

 const [currentPage, setCurrentPage] = useState(1);
 const [itemsPerPage] = useState(8);

 // Calcular los índices para los datos paginados
 const indexOfLastItem = currentPage * itemsPerPage;
 const indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const currentItems = listado.slice(indexOfFirstItem, indexOfLastItem);

 // Cambiar de página
 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 // Calcular el número total de páginas
 const totalPages = Math.ceil(listado.length / itemsPerPage);

 /* *********************************************************** */ 


  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
   
      <div className="container-table">
        <h2>Acudientes</h2>
        <h3>{errorMessage}</h3>
        <button className="add-button ancho" onClick={()=> setModal(3,0)} >Agregar</button>
        <table>
            <thead>
                <tr>
                    <th>Cedula</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Telefono</th>
                    <th>Direccion</th>
                    <th>Ingreso</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
            {listado.length > 0 ? ( 
            currentItems.map((item)=> (
                <DetalleAcudiente  key={item.cedula}
                cedula = {item.cedula}
                nombre = {item.nombre}
                apellido = {item.apellido}
                correo = {item.correo}
                celular = {item.celular}
                direccion = {item.direccion}
                ingreso = {item.fecha_registro}
                />
            ))

        ): (
          <tr><th> ... CARGANDO DATOS ....</th></tr>
        )}

            </tbody>

            <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

        </table>
      <Modal isOpen={isModalOpen} onClose={closeModal} tipo={emodal} producto = {null}  />

    </div>
    
  );
};

export default Acudientes;
