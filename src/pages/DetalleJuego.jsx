import { useEffect, useState } from "react";

export default function DetalleJuego({
  id_juego,
  estado,
  id_tiempo,
  zona,
  nombre,
  apellido,
  celular,
  time,
  inicial,
  final,
  modal,
  liberar,
  msjTitulo
}) {
  //console.log(" * estado *    " + JSON.stringify(estado));

  const sacarNino = () => {
   
    liberar(id_juego, id_tiempo)
    
  };

  const activar = () => {
    modal(id_juego, id_tiempo);
  };

  const [tiempo, setTiempo] = useState("");
  const [tiempoMas, setTiempoMas] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState("");
  let [segundosRestantes, setSegundosRestantes] = useState(0);
  const [msgEstado, setMsgEstado] = useState("");
  const [estilo, setEstilo] = useState("espera");

  const convertirASegundos = (tiempo) => {
    const [horas, minutos, segundos] = tiempo.split(":").map(Number);
    return horas * 3600 + minutos * 60 + (segundos || 0); // Si no hay segundos, asumimos 0
  };

  const convertirATiempo = (segundosTotales) => {
    const horas = Math.floor(segundosTotales / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;
    return `${horas.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
  };

  let cuentaDeMas = 0
  let cuentaRegresivaEnSegundos = convertirASegundos(final);
  //console.log(" * cuentaRegresivaEnSegundos *    " + cuentaRegresivaEnSegundos);

  //setSegundosRestantes(Number.parseInt(cuentaRegresivaEnSegundos, 10));

  //const cuentaRegresivaEnSegundos = convertirASegundos(final); // 1 hora en segundos
  //console.log(" * cuentaRegresivaEnSegundos *    " + cuentaRegresivaEnSegundos);
  //setSegundosRestantes(cuentaRegresivaEnSegundos);

  useEffect(() => {
    msjTitulo(estado)
    if (estado == 1) {
     
      const intervalo = setInterval(() => {
        //------------------------
        const tiempoActual = new Date();
        const tiempoFormateado = convertirATiempo(
          tiempoActual.getHours() * 3600 +
            tiempoActual.getMinutes() * 60 +
            tiempoActual.getSeconds()
        );
        setTiempo(convertirATiempo(convertirASegundos(tiempoFormateado) - convertirASegundos(inicial)))
        cuentaRegresivaEnSegundos =
          convertirASegundos(final) - convertirASegundos(tiempoFormateado);
        if (cuentaRegresivaEnSegundos > 0) {
          setTiempoRestante(convertirATiempo(cuentaRegresivaEnSegundos));
          setMsgEstado("...Jugando");
          setEstilo("jugando");
        } else {
          setTiempoRestante(convertirATiempo(0));
          setMsgEstado("...Terminado");
          setEstilo("terminado");
          cuentaDeMas = (convertirASegundos(final) - convertirASegundos(tiempoFormateado)) * -1
          setTiempoMas(convertirATiempo(cuentaDeMas))
         
        }

        //----------------------------------------
      }, 5000); // Cada 60 segundos
      return () => clearInterval(intervalo); // Limpia el intervalo cuando el componente se desmonte
    } else {
     
      setTiempoRestante("sin iniciar");
    }
  }, [cuentaRegresivaEnSegundos]);

  // Actualizar el tiempo restante cada vez que cambian los segundos restantes
  useEffect(() => {
    msjTitulo(estado)
    if (estado == 1) {
 
      //------------------------
      const tiempoActual = new Date();
      const tiempoFormateado = convertirATiempo(
        tiempoActual.getHours() * 3600 +
          tiempoActual.getMinutes() * 60 +
          tiempoActual.getSeconds()
      );
      cuentaRegresivaEnSegundos =
        convertirASegundos(final) - convertirASegundos(tiempoFormateado);
      if (cuentaRegresivaEnSegundos > 0) {
        setTiempoRestante(convertirATiempo(cuentaRegresivaEnSegundos));
        setMsgEstado("Jugando");
        setEstilo("jugando");
      } else {
        setTiempoRestante(convertirATiempo(0));
        setMsgEstado("Terminado");
        setEstilo("terminado");
      }

      //----------------------------------------
    } else {
     
      setTiempoRestante("sin iniciar");
    }
  }, []);

  return (
    <tr className={estilo}>
      <td className="formularioTxtDetalle">{zona.toUpperCase()} </td>
      <td className="formularioTxtDetalle">{nombre.toUpperCase()} </td>
      <td className="formularioTxtDetalle">{apellido.toUpperCase()} </td>
      <td className="formularioTxtDetalle">{celular} </td>
      <td className="formularioTxtDetalle">{time} </td>
      <td className="formularioTxtDetalle blanco">{tiempo} </td>
      <td className="formularioTxtDetalle">{inicial} </td>
      <td className="formularioTxtDetalle">{final} </td>
      <td className="formularioTxtDetalle">{tiempoRestante} </td>
      <td className="formularioTxtDetalle blanco">{tiempoMas} </td>
      
      
      <td className="centrar-boton altoJuego formularioTxtDetalle">
        {estado == 0 ? (
          <button className="add-button" onClick={activar}>
            Activar
          </button>
        ) : (
          <h4> {msgEstado} </h4>
        )}

        {estilo == "terminado" ? (
          <button className="delete-button" onClick={sacarNino}>
            X
          </button>
        ) : (
          <></>
        )}
      </td>
    </tr>
  );
}
