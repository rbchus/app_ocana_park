import { useEffect, useState } from "react";
import { setNino, } from '../services/ninos';
import './formulario.css';

const FormularioCrearNino = ({modal }) => {
   

  let [rta , setRta ] = useState(null)
  let [status , setStatus ] = useState(null)
  let [categorias , setCategorias ] = useState([])


  useEffect(() => {
  
}, [])



function obtenerFechaActual() {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, por eso se suma 1
  const dia = String(hoy.getDate()).padStart(2, '0');
  
  return `${año}-${mes}-${dia}`;
}

//console.log(obtenerFechaActual());

  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    genero:  'd',
    celular:  '',
    nacimiento:  obtenerFechaActual(),
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


    setNino(objetoEnviar).then ((response) => {
 
      //console.log (" ---- response setNino ----    " + JSON.stringify(response))

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
      <h2>Crear  Niño(a)</h2>
      <form onSubmit={handleSubmit}>

      <div className="form-group ">
          <label htmlFor="nombre">Nombre:</label>
                    
          <input className="formularioTxt"
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            autoComplete="off"
            required
            style={{ textTransform: 'uppercase' }}
          />
        </div>


        <div className="form-group">
          <label htmlFor="apellido">Apellido:</label>
                    
          <input className="formularioTxt"
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            autoComplete="off"
            required
            style={{ textTransform: 'uppercase' }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="genero">Genero:</label>
          <select id="genero" name="genero" value={formData.idCategoria} onChange={handleSelectChange} >
            <option value="d" className="formularioTxt"  >Seleccione un genero</option>
            <option value="m"  className="formularioTxt">NIÑO</option>
            <option value="f"  className="formularioTxt">NIÑA</option>
          </select>
        </div>

        <div className="form-group ">
          <label htmlFor="celular">Celular:</label>
                    
          <input className="formularioTxt"
            type="text"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            autoComplete="off"
           
          />
        </div>

        <div className="form-group">
          <label htmlFor="nacimiento">Nacimiento:</label>
          <input className="formularioTxt"
          type="date"
          name="nacimiento"
          value={formData.nacimiento}
          onChange={handleChange}
          
        />
        </div>

     
        <div className='centrar-boton'>
        <button className="edit-btn ancho" type="submit">Crear</button>
        <p className={status?("ok"):("ok")}> {rta} </p>
        </div>

        
      </form>
      
    </div>
  );
}


  export default FormularioCrearNino;