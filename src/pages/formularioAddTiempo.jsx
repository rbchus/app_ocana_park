import { useEffect, useState } from "react";
import { setJuegos } from '../services/juegos';
import "./formulario.css";

const FormularioAddTiempo = ({ nino, modal }) => {
  let [rta, setRta] = useState(null);
  let [status, setStatus] = useState(null);
  let [categorias, setCategorias] = useState([]);

  let times = [
    { id: 1, name: "15 minutos" },
    { id: 2, name: "30 minutos" },
    { id: 3, name: "1 hora" },
  ];

  let zonas = [
    {
      id: 1,
      name: "BABY GYM",
      price: [
        { idPrice: 1, name: "15 minutos", price: 8000 },
        { idPrice: 2, name: "30 minutos", price: 12000 },
        { idPrice: 3, name: "1 hora", price: 20000 },
      ],
    },

    {
      id: 2,
      name: "PLAY GROUND",
      price: [
        { idPrice: 1, name: "15 minutos", price: 8000 },
        { idPrice: 2, name: "30 minutos", price: 12000 },
        { idPrice: 3, name: "1 hora", price: 20000 },
      ],
    },
    /* {
      id: 3,
      name: "VIP",
      price: [
        { idPrice: 1, name: "15 minutos", price: 5000 },
        { idPrice: 2, name: "30 minutos", price: 7000 },
        { idPrice: 3, name: "1 hora", price: 11000 },
      ],
    },*/
  ];

  const [juego, setJuego] = useState("");
  const [precio, setPrecio] = useState("");
  const [_juego, _setJuego] = useState("");
  const [_tiempo, _setTiempo] = useState("");
  const [_precio, _setPrecio] = useState("");
  const [flag, setFlag] = useState(true);
  const [estilo, setEstilo] = useState("gray-button ancho");

  const changeJuego = (e) => {
    setJuego(e.target.value);
  };

  const changePrecio = (e) => {
    setPrecio(e.target.value);
  };

  useEffect(() => {
    console.log(
      ` la zona de juego fue ${juego} y el  id de precio fue ${precio}`
    );

    const resultado = zonas
      .filter((zona) => zona.id == juego)
      .map((zona) => ({
        ...zona,
        price: zona.price.filter((item) => item.idPrice == precio),
      }));

    try {
      console.log(" resultado " + JSON.stringify(resultado));
      _setJuego(resultado[0].name);
      _setTiempo(resultado[0].price[0].name);
      _setPrecio(resultado[0].price[0].price);
    } catch (error) {
      console.log(" resultado  error" + JSON.stringify(error));
    }

    if (juego != "" && juego != "") {
      setEstilo("add-button ancho");

      setFlag(false);
    } else {
      setEstilo("gray-button ancho");
      setFlag(true);
    }
  }, [juego, precio]);

  const fecha = (fechaOriginal) => {
    let fecha = new Date(fechaOriginal);
    let fechaFormateada = fecha.toLocaleDateString("es-ES");
    return fechaFormateada;
  };

  useEffect(() => {}, []);

  console.log(" Tiempo ---- " + JSON.stringify(nino));

  // Definimos el estado para cada campo del formulario
  const [formData, setFormData] = useState({
    id: nino.id,
    nombre: nino.nombre,
    apellido: nino.apellido,
    genero: nino.genero,
    nacimiento: nino.nacimiento,
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
      id_nino: nino.id,
      id_zona: juego,
      id_tiempo: precio,
    };
   

    setJuegos(objetoEnviar).then ((response) => {
 
      console.log (" ---- response setJuegos ----    " + JSON.stringify(response))

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

    console.log(" ENVIAR API     " + JSON.stringify(objetoEnviar));
    //alert(`Datos enviados: \nId ${formData.id}\nNombre: ${formData.nombre}\nPrecio: ${formData.precio}\nFoto: ${formData.foto}\nDescripcion: ${formData.descripcion}`);
  };

  return (
    <div className="App">
      <img
        className="iconoGenero"
        src={`./img/${nino.genero.toLowerCase()}.svg`}
      />
      <h2>
        Agregar Tiempo y Juego <br /> {nino.nombre.toUpperCase()}{" "}
        {nino.apellido.toUpperCase()}{" "}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="campos">
          <h3>ZONA</h3>

          {zonas.map((zona) => (
            <label key={zona.id}>
              <input
                type="radio"
                value={zona.id}
                checked={juego == zona.id}
                onChange={changeJuego}
              />
              {zona.name}
            </label>
          ))}
        </div>
        <hr />

        <div className="campos">
          <h3>TIEMPO</h3>

          {times.map((tiempo) => (
            <label key={tiempo.id}>
              <input
                type="radio"
                value={tiempo.id}
                checked={precio == tiempo.id}
                onChange={changePrecio}
              />
              {tiempo.name}
            </label>
          ))}
        </div>

        <hr />
      
        <br />
        <div>
          <h1>
            {_juego != ""
              ? `[${_juego}]  [${_tiempo}]  $ [${_precio}]`
              : " DETALLE COMPRA"}
          </h1>
        </div>
        <hr />
      
        <br />

        <div className='centrar-boton'>
        <button className={estilo} type="submit" disabled={flag}>
          Agregar
        </button>
        <p className={status?("ok"):("ok")}> {rta} </p>
        </div>

       
      </form>
  
    </div>
  );
};

export default FormularioAddTiempo;
