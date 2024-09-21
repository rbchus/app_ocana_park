import { useEffect, useState } from "react";
//import { getCategorias, setProducto } from '../servicios/prodcutos.servicio';
import './formulario.css';

const FormularioCrear = () => {
   

  let [rta , setRta ] = useState(null)
  let [status , setStatus ] = useState(null)
  let [categorias , setCategorias ] = useState([])


  useEffect(() => {
 
}, [])




  // Definimos el estado para cada campo del formulario
  const [formData, setFormData] = useState({
    id: '',
    idCategoria: '',
    categoria:  '',
    nombre:  '',
    precio:   '',
    foto:   '',
    descripcion:   '',
  });

  // Manejador de cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      // Guardamos tanto el value como el id
    });
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("Datos enviados: ", formData);
    // Aquí puedes hacer lo que quieras con los datos (ej. enviarlos a una API)
    let objetoEnviar = {
      id_producto: formData.id,
      nombre_producto: formData.nombre,
      descripcion_producto:  formData.descripcion,
      precio_producto:  formData.precio,
      foto_producto:  formData.foto,
      id_categoria:  formData.idCategoria,
      nombre_categoria:  formData.categoria
    }


    setProducto(objetoEnviar).then ((response) => {
      //console.log (" * response *    " + JSON.stringify(response))
      setRta(response.data.message)
      setStatus(response.data.status)
      
       
   })
   .catch ((error) => {
       console.log ("Error leer Error al editar el producto  " + error)
   })


   
    

    console.log (" ENVIAR API     " + JSON.stringify(objetoEnviar))
    //alert(`Datos enviados: \nId ${formData.id}\nNombre: ${formData.nombre}\nPrecio: ${formData.precio}\nFoto: ${formData.foto}\nDescripcion: ${formData.descripcion}`);
  };

  return (
    <div className="App">
      <h2>Crear  Producto</h2>
      <form onSubmit={handleSubmit}>

      <div className="form-group">
          <label htmlFor="nombre">ID:</label>
                    
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </div>


        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
                    
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

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select id="idCategoria" name="idCategoria" value={formData.idCategoria} onChange={handleSelectChange} required>
            <option value="" >Seleccione una categoría</option>
            {categorias.map((kate)=> (
               <option  key={kate.id_categoria} value={kate.id_categoria} >{kate.nombre_categoria}</option>
            ))}
          </select>
        </div>


        <button className="edit-btn" type="submit">Enviar</button>
      </form>
      <p className={status?("ok"):("error")}> {rta} </p>
    </div>
  );
}


  export default FormularioCrear;