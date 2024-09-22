import { useEffect, useState } from "react";
import { setAcudiente, } from '../services/acudientes';
import './formulario.css';

const FormularioCrearAcudiente = () => {
   

  let [rta , setRta ] = useState(null)
  let [status , setStatus ] = useState(null)
  let [categorias , setCategorias ] = useState([])


  useEffect(() => {
  
}, [])




  // Definimos el estado para cada campo del formulario
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellido:  '',
    correo:  '',
    celular:   '',
    direccion:   '',
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
      cedula: formData.cedula,
      nombre: formData.nombre,
      apellido:  formData.apellido,
      correo:  formData.correo,
      celular:  formData.celular,
      direccion:  formData.direccion
    }


    setAcudiente(objetoEnviar).then ((response) => {
 
      //console.log (" ---- response ----    " + JSON.stringify(response))

        if (response.status)
          setRta(response.data.message)
        else
        setRta(response.message)
  
      
       
   })
   .catch ((error) => {
       console.log ("Error    " + error)
       setRta(response.data.message)
   })

   
    

    //console.log (" ENVIAR API     " + JSON.stringify(objetoEnviar))
    //alert(`Datos enviados: \nId ${formData.id}\nNombre: ${formData.nombre}\nPrecio: ${formData.precio}\nFoto: ${formData.foto}\nDescripcion: ${formData.descripcion}`);
  };

  return (
    <div className="App">
      <h2>Crear  Acudiente</h2>
      <form onSubmit={handleSubmit}>

      <div className="form-group">
          <label htmlFor="nombre">Cedula:</label>
                    
          <input
            type="text"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            autoComplete="off"
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
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="celular">Celular:</label>
          <input
            type="text"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="direccion">Direccion:</label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>


        <button className="edit-btn" type="submit">Enviar</button>
      </form>
      <p className={status?("ok"):("error")}> {rta} </p>
    </div>
  );
}


  export default FormularioCrearAcudiente;