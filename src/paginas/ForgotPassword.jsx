import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import Swal from "sweetalert2";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!alerta.length !== 0) {
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }

    if (email === "" || email.length < 6) {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/usuarios/forgot-password`,
        { email }
      );
      
      Swal.fire(
        'Correo Enviado!',
        `${data.msg}`,
        'success'
      )
      setEmail('');

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
      <h1 className="title-welcome">¿Olvidaste tu Contraseña?</h1>
      <p className="text-center p-2">
        Aquí puedes diligenciar tú correo electrónico y al mismo te llegará un
        enlace donde podrás ingresar tu nueva contraseña.
      </p>

      <form
        className="space-y-8 px-10 pt-5 pb-10 text-center"
        onSubmit={handleSubmit}
      >
        {msg && <Alert alerta={alerta} />}

        <div className="group relative">
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            variant="bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="bg-[#2b0572] btn-login w-full rounded-3xl text-white transition-all duration-300"
        >
          Enviar
        </Button>
      </form>
    </>
  );
}

export default ForgotPassword;
