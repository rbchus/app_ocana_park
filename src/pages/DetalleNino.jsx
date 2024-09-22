import { faChild } from '@fortawesome/free-solid-svg-icons'; // Íconos de Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default function  DetalleNino ({id, nombre,  apellido,  genero, celular,  nacimiento, ingreso, modal}) {


  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edadCalculada = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    // Ajusta si aún no ha pasado el cumpleaños en este año
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edadCalculada--;
    }

    return edadCalculada;
  };


    const getGenderIcon = (gender) => {
        if (gender === 'm') {
          return <FontAwesomeIcon icon={faChild} title="Niño" />;
        } else if (gender === 'f') {
          return <FontAwesomeIcon icon={faFemale} title="Niña" />;
        } else {
          return null; // Si no hay información de género o es diferente
        }
      };


      const tiempo = () => {
        let objetoEnviar = {
          id: id,
          nombre: nombre,
          apellido: apellido,
          genero:  genero,
          celular:  celular,
          nacimiento:  nacimiento,
        }
  
          modal(3, objetoEnviar )
         };


    const editar = () => {
      let objetoEnviar = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        genero:  genero,
        celular:  celular,
        nacimiento:  nacimiento,
      }

        modal(1, objetoEnviar )
       };
 
       const eliminar = () => {
        let objetoEnviar = {
          id: id,
          nombre: nombre,
          apellido: apellido,
          genero:  genero,
          celular:  celular,
          nacimiento:  nacimiento,
        }
         modal(2, objetoEnviar )
        };

    const fecha  = (fechaOriginal) => {
        let fecha  = new Date(fechaOriginal);
        let fechaFormateada = fecha.toLocaleDateString('es-ES')
        return fechaFormateada
    }

    const fechaHora  = (fechaOriginal) => {
        let fecha = new Date(fechaOriginal);
        let fechaFormateada = fecha.toLocaleString()
       return fechaFormateada
   }

    
       

    return (
        <tr className=''>
        
     

        <td className="formularioTxt">{nombre.toUpperCase()} </td>
        <td className="formularioTxt">{apellido.toUpperCase()} </td>
        <td  > <img className='iconoGenero' src={`./img/${genero.toLowerCase()}.svg`} /> </td>
        <td className="formularioTxt">{celular} </td>
        <td className="formularioTxt" >{fecha(nacimiento)} </td>
        <td className="formularioTxt">{ calcularEdad(nacimiento)} </td>
       
        <td className="formularioTxt">{fechaHora(ingreso)} </td>

        
        

        <td className="container-juegos altoJuego formularioTxt">
        <button className="add-button ancho " onClick={tiempo} >Tiempo</button>
        <button className="edit-button ancho " onClick={editar} >Editar</button>
        <button className="delete-button ancho" onClick={eliminar}>Eliminar</button>
        </td>
    
    </tr>
       
    )
}