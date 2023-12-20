// import { set } from "mongoose";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import dayjs from "dayjs";
import io from "socket.io-client";

let socket;

const HorasExtrasContext = createContext();

const HorasExtrasProvider = ({ children }) => {
  const [horas, setHoras] = useState([]);
  const [TodasHorasExtras, setTodasHorasExtras] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [hora, setHora] = useState({});
  const [cargando, setCargando] = useState(false);

  const { auth } = useAuth();
  const navigate = useNavigate();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  useEffect(() => {
    const obtenerHorasExtras = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/horasextras`,
          config
        );
        setHoras(data);
        // console.log(horas);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerHorasExtras();
  }, [auth]);

  useEffect(() => {
    const obtenerTodasHorasExtras = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/horasextras/alluser`,
          config
        );
        setTodasHorasExtras(data);
        console.log("Todas HORAS EXTRAS: ",TodasHorasExtras);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerTodasHorasExtras();
  }, [horas]);

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL)
  }, [])
  

  const submitHoras = async (hora) => {
    if (hora.id) {
      //id está unicamente para cuando está editando horas
      await editarHoraExtra(hora);
    } else {
      await nuevaHoraExtra(hora);

    }

    return;
  };

  const editarHoraExtra = async (hora) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/horasextras/${hora.id}`,
        hora,
        config
      );

      // console.log(horas);
      const horasActualizadas = horas.map((horaState) =>
        horaState._id === data._id ? data : horaState
      );
      setHoras(horasActualizadas);

      Swal.fire(
        "Se actualizó correctamente",
        "Ya puedes visualizar tu hora extra actualizada",
        "success"
      );
      setTimeout(() => {
        navigate("/horas-extras");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  const nuevaHoraExtra = async (hora) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/horasextras`,
        hora,
        config
      );
      console.log(data);
      setHoras([...horas, data]);
      Swal.fire(
        "Se creó correctamente",
        "Ya puedes visualizar tu nueva hora extra registrada",
        "success"
      );
      // Socket.io
      socket.emit('nueva_hora', data)

      setTimeout(() => {
        navigate("/horas-extras");
      }, 1000);

    } catch (error) {
      console.log(error);
    }
  };

  const obtenerHora = async (id) => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/horasextras/${id}`,
        config
      );
      setHora(data);
      console.log("Hora:", hora);
    } catch (error) {
      console.log(error);
    }

    setCargando(false);
  };

  const eliminarHora = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/horasextras/${id}`,
        config
      );
      const horasActualizadas = horas.filter((hora) => hora._id !== id);
      // console.log(horasActualizadas);

      Swal.fire(
        "Se eliminó correctamente",
        "Ya puedes visualizar tu nueva hora extra registrada",
        "success"
      );
      setTimeout(() => {
        setHoras(horasActualizadas);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const cerrarSesionHoras = () => {
    setHoras([]);
    setHora({});
  };

  const calcularHorasNocturnasDiurnas = (horas, inicio) => {

    // Inicializar contadores
    let horasDiurnas = 0;
    let horasNocturnas = 0;

    // Recorrer cada hora entre las fechas y determinar si es diurna o nocturna
    for (let i = 0; i < horas; i++) {
      const horaActual = dayjs(inicio).add(i, "hour").hour();

      // Consideramos como nocturnas las horas después de la hora límite nocturna
      if (horaActual >= 18 || horaActual < 6) {
        horasNocturnas++;
      } else {
        horasDiurnas++;
      }
    }

    const pagoHorasDiurnas = horasDiurnas * 6042;
    const pagoHorasNocturnas = horasNocturnas * 8458;
    const valor = pagoHorasDiurnas + pagoHorasNocturnas;

    const totalPago = valor.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP'
  });
    return {
      horas,
      horasDiurnas,
      horasNocturnas,
      pagoHorasDiurnas,
      pagoHorasNocturnas,
      totalPago
    };
  };

  // Socket.io
const submitHorasExtras = (nuevahora) => {
  setHoras([...horas, nuevahora]);
  console.log(horas);
}

  return (
    <HorasExtrasContext.Provider
      value={{
        horas,
        mostrarAlerta,
        alerta,
        submitHoras,
        hora,
        obtenerHora,
        cargando,
        eliminarHora,
        cerrarSesionHoras,
        TodasHorasExtras,
        calcularHorasNocturnasDiurnas,
        submitHorasExtras
      }}
    >
      {children}
    </HorasExtrasContext.Provider>
  );
};

export { HorasExtrasProvider };

export default HorasExtrasContext;
