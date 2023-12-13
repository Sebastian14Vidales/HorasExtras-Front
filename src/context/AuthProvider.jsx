import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Obtener la ubicación actual

  // Extraer el pathname de la ubicación actual
  const { pathname } = location;

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }
      // console.log("SI HAY TOKEN");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/usuarios/perfil`,
          config
        );

        setAuth(data);
        const rutas = [
          "/",
          "/register",
          "/forgot-password",
          "/confirm",
          "horas-extras",
        ];
        if (rutas.includes(pathname)) {
          navigate("/horas-extras");
        }
      } catch (error) {
        setAuth({});
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({})
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, cargando, cerrarSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
