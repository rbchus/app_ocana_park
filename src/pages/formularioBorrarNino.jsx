import { useEffect, useState } from "react";
import { delteNino, } from '../services/ninos';
import './formulario.css';


const FormularioBorrarNino = ({ nino, modal }) => {
   

  let [rta , setRta ] = useState(null)
  let [status , setStatus ] = useState(null)
  let [categorias , setCategorias ] = useState([])

  const fecha  = (fechaOriginal) => {
    let fecha  = new Date(fechaOriginal);
    let fechaFormateada = fecha.toLocaleDateString('es-ES')
    return fechaFormateada
}


  useEffect(() => {
  
}, [])


 console.log (" Editar ---- " + JSON.stringify(nino))

  // Definimos el estado para cada campo del formulario
  const [formData, setFormData] = useState({
    nombre: nino.nombre,
    apellido: nino.apellido,
    genero:  nino.genero,
    celular:  nino.celular,
    nacimiento:  nino.nacimiento,
   
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
      nombre: formData.nombre,
      apellido: formData.apellido,
      genero:  formData.genero,
      celular:  formData.celular,
      nacimiento:  formData.nacimiento,
     
     
    }


    delteNino(nino.id).then ((response) => {
 
      console.log (" ---- response deelteNino ----    " + JSON.stringify(response))

        if (response.status) {
          setRta(response.data.message)
          modal(0, objetoEnviar )
        }
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
      <h2>Borrar  Niño(a)</h2>
      <form onSubmit={handleSubmit}>

      <div className="form-group ">
          <label htmlFor="nombre">Nombre:</label>
          <div>  {nino.nombre.toUpperCase()}</div>
                    
        
        </div>


        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
          {nino.apellido.toUpperCase()}         
       
        </div>

        <div className="form-group">
        <img className='iconoGenero' src={`./img/${nino.genero.toLowerCase()}.svg`} /> 
         
        </div>


        <div className="form-group">
          <label htmlFor="celular">Celular:</label>
          {nino.celular}         
       
        </div>
    

        <div className="form-group">
          <label htmlFor="nacimiento">Nacimiento:</label>
          {fecha(nino.nacimiento)}
        
        </div>

     
        <div className='centrar-boton'>
        <button className="delete-button ancho" type="submit">Borrar</button>
        <p className={status?("ok"):("ok")}> {rta} </p>
        </div>


        
      </form>
     
    </div>
  );
}


  export default FormularioBorrarNino;