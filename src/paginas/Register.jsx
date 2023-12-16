import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Swal from "sweetalert2";
import axios from "axios";

function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!alerta.length !== 0) {
      setTimeout(() => {
        setAlerta({})
      }, 3000);
    }

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (password !== repetirPassword) {
      setAlerta({
        msg: "Las contraseñas deben coincidir",
        error: true,
      });
      return;
    }
    if (password.length <= 6) {
      setAlerta({
        msg: "La contraseña es muy corta, debe ser mínimo de 7 caracteres",
        error: true,
      });
      return;
    }
    setAlerta({});

    // Creando el usuario en la API
    console.log("Creando usuario...");
    try {
      const {data} = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios`,
        { nombre, password, email }
      );
      // data proviene del USUARIO-CONTROLLER
      // data = Usuario creado correctamente. Revisa tu email para confirmar tu cuenta
      Swal.fire(
        '¡Usuario Registrado!',
        `${data.msg}`,
        'success'
      )

      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const { msg } = alerta;
  return (
    <>
      <h1 className="title-welcome">¡Crea una cuenta!</h1>
      
      <form
        className="space-y-6 px-10 py-10 text-center"
        onSubmit={handleSubmit}
      >
        {msg && <Alert alerta={alerta} />}
        <div className="group relative">
          <Input
            id="name"
            type="text"
            label="Name"
            placeholder="Enter your name"
            variant="bordered"
            data-focus-visible="false"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="group relative">
          <Input
            id="email"
            type="email"
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
            type="password"
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="group relative">
          <Input
            id="password2"
            name="password"
            type="password"
            label="Repeat Password"
            variant="bordered"
            placeholder="Repeat your password"
            value={repetirPassword}
            onChange={(e) => setRepetirPassword(e.target.value)}
          />
        </div>
        

        <Button
          type="submit"
          className="bg-[#2b0572] uppercase font-bold btn-login w-full rounded-3xl text-white transition-all duration-300"
        >
          Crear Cuenta
        </Button>
        <nav className="text-[#2b0572] hover:text-[#4411a3] flex flex-col justify-center items-center uppercase mx-6 mb-6 text-xs font-medium">
          <Link to={"/"} className="mb-2">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
          <Link to={"/forgot-password"}>¿Olvidó su Contraseña?</Link>
        </nav>
      </form>
    </>
  );
}

export default Register;
