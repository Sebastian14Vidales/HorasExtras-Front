// import { set } from "mongoose";
import axios from "axios";
import { useState, useEffect, createContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const HorasExtrasContext = createContext();

const HorasExtrasProvider = ({ children }) => {
  const [horas, setHoras] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [hora, setHora] = useState({});
  const [cargando, setCargando] = useState(false);

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
        }

        const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/horasextras`, config);
        setHoras(data)
        
      } catch (error) {
        console.log(error);
      }
    };

    obtenerHorasExtras();
  }, []);

  const navigate = useNavigate();

  const submitHoras = async (hora) => {
    
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
      setHoras([...horas, data])
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

  const obtenerHora = async id => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/horasextras/${id}`, config);
      setHora(data)
      
    } catch (error) {
      console.log(error);
    }

    setCargando(false)
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
        cargando
      }}
    >
      {children}
    </HorasExtrasContext.Provider>
  );
};

export { HorasExtrasProvider };

export default HorasExtrasContext;
