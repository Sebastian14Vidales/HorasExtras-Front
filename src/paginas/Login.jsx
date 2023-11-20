import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import axios from "axios";
import { EyeFilledIcon } from "../components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon";

import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import "../styles/login.css";
import useAuth from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { setAuth } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alerta.length !== 0) {
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/usuarios/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", data.token);
      setAuth(data);

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <h1 className="title-welcome">¡Bienvenido!</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 px-10 py-10 text-center"
      >
        {msg && <Alert alerta={alerta} />}
        <div className="group relative">
          <Input
            id="email"
            type="email"
            name="identifier"
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            data-focus-visible="false"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="group relative">
          <Input
            id="password"
            name="password"
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <div className="text-2xl text-default-400 pointer-events-none">
                    <EyeSlashFilledIcon />
                  </div>
                ) : (
                  <div className="text-2xl text-default-400 pointer-events-none">
                    <EyeFilledIcon />
                  </div>
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
        </div>
        <Button
          type="submit"
          className="bg-[#2b0572] btn-login w-full rounded-3xl text-white transition-all duration-300"
        >
          Iniciar Sesión
        </Button>
      </form>
      <nav className="text-[#2b0572] hover:text-[#4411a3] flex justify-between uppercase mx-6 mb-6 text-xs font-medium">
        <Link to={"/register"}>Regístrate aquí</Link>
        <Link to={"/forgot-password"}>¿Olvidó su Contraseña?</Link>
      </nav>
    </>
  );
}

export default Login;
