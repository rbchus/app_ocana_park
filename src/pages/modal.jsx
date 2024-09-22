import { useEffect, useState } from "react";
import "./modal.css";

//import { default as FormularioBorrar, default as FormularioEditar } from "./formularioBorrar";
//import FormularioCrearAcudiente from './formularioCrearAcudiente';

import FormularioAddTiempo from "./formularioAddTiempo";
import FormularioBorrarNino from "./formularioBorrarNino";
import FormularioCrearNino from "./formularioCrearNino";
import FormularioEditarNino from "./formularioEditarNino";

const Modal = ({ isOpen, onClose, tipo, nino , modal}) => {
 
  const [objetoNino, setObejetoNino] = useState("");
  useEffect(() => {  () => {onClose} }, [tipo]);

  const setModal = (tipo, id) => {
    //console.log(" ++ MODAL ++ " + JSON.stringify(tipo));
    //console.log("  ++ MODAL ++ " + JSON.stringify(id));
    modal(tipo, id )
    setObejetoNino(id)
  };
//
  const formulario = (idFormulario) => {
    switch (idFormulario) {
      case 0:
        return <FormularioCrearNino modal={setModal} />;
        break;
      case 1:
        return <FormularioEditarNino nino = {nino}  modal={setModal}  />;
        break;
      case 2:
        return <FormularioBorrarNino nino = {nino}  modal={setModal}  />;
        break;
      case 3:
        return <FormularioAddTiempo nino = {nino}  modal={setModal}  />;
        break;

      case 4:
        return <div>  AGREGAR TIEMPO  </div>;
        break;
    }
  };

  if (!isOpen) return null; // No renderizar si el modal no está abierto

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="close-modal" onClick={onClose}>
          X
        </div>
        {formulario(tipo)}
      </div>
    </div>
  );
};

export default Modal;
