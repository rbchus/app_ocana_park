import { useState } from "react";
//import { deleteProducto } from "../servicios/prodcutos.servicio";

const  FormularioBorrar  = ({id, nombre, precio, descripcion,foto, idCategoria, categoria, close}) => {

  let [rta , setRta ] = useState(null)
  let [status , setStatus ] = useState(null)


    const cancelar = () => {
      close()
      };

      const borrar = () => {
        //console.log ( " Borrar " + id)
        deleteProducto(id).then ((response) => {
          //console.log (" * response  Borrar *    " + JSON.stringify(response))
          setRta(response.data.message)
          setStatus(response.data.status)
          
           
       })
       .catch ((error) => {
           console.log ("Error leer Error al borrar  el producto  " + error)
       })
    
      };



    return (

        <table>
           <thead>
            <tr>
                <th>Desea eliminar este producto ? </th>
            
            </tr>
        </thead>
        <tbody>
                  <tr> <td>{nombre} </td></tr>
                  <tr><td>$ {precio}</td></tr>
                  <tr><td className = "descripcion">{descripcion}</td></tr>
                  <tr><td><img  style = {{ width:"200px"}} src={foto}/> </td></tr>
                  <tr><td className="actions ordenButton">
                    <button className="edit-btn"  onClick={cancelar} >Cancelar</button>
                    <button className="delete-btn" onClick={borrar} >Borrar</button>
                    </td></tr>
                    </tbody>

                    <tr>
                <td className={status?("ok"):("error")}> {rta} </td>
            
            </tr>

                    </table>
        
       
    )
}


export default FormularioBorrar;