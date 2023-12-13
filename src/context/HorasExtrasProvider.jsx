// import { set } from "mongoose";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// import dayjs from "dayjs";

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
          `${import.meta.env.VITE_BACKEND_URL}/horasextras`,
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
          `${import.meta.env.VITE_BACKEND_URL}/horasextras/alluser`,
          config
        );
        setTodasHorasExtras(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerTodasHorasExtras();
  }, [auth]);

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
        `${import.meta.env.VITE_BACKEND_URL}/horasextras/${hora.id}`,
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
        `${import.meta.env.VITE_BACKEND_URL}/horasextras`,
        hora,
        config
      );

      setHoras([...horas, data]);

      Swal.fire(
        "Se creó correctamente",
        "Ya puedes visualizar tu nueva hora extra registrada",
        "success"
      );

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
        `${import.meta.env.VITE_BACKEND_URL}/horasextras/${id}`,
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
        `${import.meta.env.VITE_BACKEND_URL}/horasextras/${id}`,
        config
      );
      const horasActualizadas = horas.filter((hora) => hora._id !== id);
      console.log(horasActualizadas);

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
        TodasHorasExtras
      }}
    >
      {children}
    </HorasExtrasContext.Provider>
  );
};

export { HorasExtrasProvider };

export default HorasExtrasContext;
