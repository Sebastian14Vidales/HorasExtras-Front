import { Button } from "@nextui-org/react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useHorasExtras from "../hooks/useHorasExtras";

function Header() {
  const { auth, cerrarSesionAuth } = useAuth();
  const { cerrarSesionHoras } = useHorasExtras();
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    // console.log('Cerrando Sesión');
    cerrarSesionAuth();
    cerrarSesionHoras();
    localStorage.removeItem("token");
    // navigate("/");
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-[#2b0572] font-black text-center">
          Horas Extras
        </h2>

        <input
          type="search"
          placeholder="Busca Personas"
          className="rounded-lg lg:w-96 block p-2 border"
        />

        <div className="flex items-center gap-4">
        <p className="text-xl font-bold">Hola {auth.nombre}</p>
          <Button onPress={handleCerrarSesion} className="bg-[#2b0572] text-white uppercase font-bold">
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
