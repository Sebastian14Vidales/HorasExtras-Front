import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";

function ConfirmAccount() {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    
    const confirmarCuenta = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/usuarios/confirmar/${id}`
        );
        Swal.fire("¡Usuario Autenticado!", `${data.msg}`, "success");
        setCuentaConfirmada(true);
      } catch (error) {
        Swal.fire(
          "¡El usuario ya se autenticó!",
          "Ya el usuario hizo esta autenticación",
          "error"
        );
      }
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <h1 className="m-0 px-5 py-10 title-welcome">
        ¡Confirma tu cuenta y empieza a registrar tus horas extras!
      </h1>

      {cuentaConfirmada && (
        <div className="block text-center mb-8">
          <Link
            to={"/"}
            className="bg-[#2b0572] py-3 px-8 font-bold btn-login w-full rounded-3xl text-white transition-all duration-300"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}
    </>
  );
}

export default ConfirmAccount;
