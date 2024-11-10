import { useEffect, useState } from "react";

export default function Card({
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

  const [barra, setBarra] = useState(0);
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
          setMsgEstado("En Juego");
          setEstilo("jugando");
        } else {
          setTiempoRestante(convertirATiempo(0));
          setMsgEstado("Terminado");
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
        setMsgEstado("En Juego");
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

  const acercar = (n) => {
    if (n <= 10)
       return 10
       else if (n <= 20)
        return 20
       else if (n <= 30)
        return 30
       else if (n <= 40)
        return 40
       else if (n <= 50)
        return 50
       else if (n <= 60)
        return 60
       else if (n <= 70)
        return 70
       else if (n <= 80)
        return 80
       else if (n <= 80)
        return 80
       else if (n <= 100)
        return 100

  }

  useEffect(() => {
    let porcentaje = 0
    let tiempoComprado = convertirASegundos(final) - convertirASegundos(inicial)
    let  tiempoUsado = convertirASegundos(tiempo) 
    if (tiempoUsado >= tiempoComprado) {
      porcentaje = 100
    }else {
      porcentaje = (tiempoUsado * 100 ) / tiempoComprado

    }
    console.log (" porcentaje " + acercar(Math.round(porcentaje))  )
    
    setBarra( acercar(Math.round(porcentaje)) )
    
}, [tiempo])

  return (
    <section class="dashboard-section">
  
    <div class="game-progress-card">
        <div class="game-header">
            <h5>{nombre.toUpperCase()} {apellido.toUpperCase()} </h5>
             <div>
             {estado == 0 ? (
          <button className="add-button" onClick={activar}>
            Activar
          </button>
        ) : (
         <></>
        )}

        {estilo == "terminado" ? (
          <button className="delete-button" onClick={sacarNino}>
            Sacar
          </button>
        ) : (
          <></>
        )}
             </div>
        </div>
        <div class="game-info">
            <p><strong>{zona.toUpperCase()}:</strong> <span> | <strong></strong> {time}</span></p>
            <p><strong>Restante:</strong> <span> | <strong></strong>{tiempoRestante}</span></p>
        </div>
    
        <div class="progress-bar">
            <div class="progress" data-progress={barra}></div>
        </div>
        <p class="time-remaining"><strong class={estilo}> {msgEstado} </strong> 
        <span class={estilo}>{estilo == "terminado" ? tiempoMas : tiempo}</span> </p>
    </div>
</section>
  );
}
