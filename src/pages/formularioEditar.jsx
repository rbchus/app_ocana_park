import { useState } from "react";
//import { updateProducto } from '../servicios/prodcutos.servicio';
import './formulario.css';

const FormularioEditar = ({id, nombre, precio, descripcion,foto, idCategoria, categoria}) => {
   

  let [rta , setRta ] = useState(null)
  let [status , setStatus ] = useState(null)




  // Definimos el estado para cada campo del formulario
  const [formData, setFormData] = useState({
    id: id,
    idCategoria: idCategoria,
    categoria: categoria,
    nombre: nombre,
    precio:  precio,
    foto:  foto,
    descripcion:  descripcion
  });

  // Manejador de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("Datos enviados: ", formData);
    // Aquí puedes hacer lo que quieras con los datos (ej. enviarlos a una API)
    let objetoEnviar = {
      nombre_producto: formData.nombre,
      descripcion_producto:  formData.descripcion,
      precio_producto:  formData.precio,
      foto_producto:  formData.foto,
      id_categoria:  formData.idCategoria,
      nombre_categoria:  formData.categoria
    }


    updateProducto(objetoEnviar, formData.id ).then ((response) => {
      //console.log (" * response *    " + JSON.stringify(response))
      setRta(response.data.message)
      setStatus(response.data.status)
      
       
   })
   .catch ((error) => {
       console.log ("Error leer Error al editar el producto  " + error)
   })


   
    

    //console.log (" ENVIAR API     " + JSON.stringify(objetoEnviar))
    //alert(`Datos enviados: \nId ${formData.id}\nNombre: ${formData.nombre}\nPrecio: ${formData.precio}\nFoto: ${formData.foto}\nDescripcion: ${formData.descripcion}`);
  };

  return (
    <div className="App">
      <h2>Editar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="hidden"
            id="id"
            name="id"
            value={formData.id}
          
          />
           <input
            type="hidden"
            id="idCategoria"
            name="idCategoria"
            value={formData.idCategoria}
          
          />
           <input
            type="hidden"
            id="categoria"
            name="categoria"
            value={formData.categoria}
          
          />
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="text"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="foto">Foto:</label>
          <input
            type="text"
            id="foto"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripcion:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <button className="button-modal" type="submit">Enviar</button>
      </form>
      <p className={status?("ok"):("error")}> {rta} </p>
    </div>
  );
}


  export default FormularioEditar;