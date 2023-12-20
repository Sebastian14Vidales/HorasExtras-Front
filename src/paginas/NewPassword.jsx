import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Alert from "../components/Alert";

function NewPassword() {
  const [passwordModificado, setPasswordModificado] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);

  const params = useParams();
  const { token } = params;

  if (!alerta.length !== 0) {
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  }

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        // TODO: Mover hacia un cliente axios
        await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/usuarios/forgot-password/${token}`
        );
        setTokenValido(true);
        
      } catch (error) {
        Swal.fire(
          "¡Se cambió la contraseña!",
          "Ya el usuario hizo la modificación de la constraseña. No puedes acceder aquí",
          "error"
        );
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe ser de más de 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const {data} = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/forgot-password/${token}`,
        { password }
      );
      Swal.fire("¡Se cambió la contraseña!", `${data.msg}`, "success");
      setPasswordModificado(true);
      setTokenValido(false)
    } catch (error) {
      console.log(error.response);
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className={`${tokenValido ? "mb-0" : "mb-8"} title-welcome`}>
        ¡Ingresa tu nueva contraseña!
      </h1>
      {tokenValido && (
        <form
          className="space-y-6 px-10 py-10 text-center"
          onSubmit={handleSubmit}
        >
          {msg && <Alert alerta={alerta} />}
          <div className="group relative">
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              variant="bordered"
              placeholder="Write your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="bg-[#2b0572] btn-login w-full rounded-3xl text-white transition-all duration-300"
          >
            Guardar Nueva Contaseña
          </Button>
        </form>
      )}

      {passwordModificado && (
        <div className="block text-center mb-8">
          <Link
            to={"/"}
            className="bg-[#2b0572] py-3 px-8  font-bold btn-login w-full rounded-3xl text-white transition-all duration-300"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}
    </>
  );
}

export default NewPassword;
