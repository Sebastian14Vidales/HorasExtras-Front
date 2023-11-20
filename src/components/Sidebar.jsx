import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Extraer la ruta actual y establecer el enlace activo basado en la ruta
    setActiveLink(location.pathname);
    console.log(location.pathname);
  }, [location]);

  return (
    <aside className="md:w-80 lg:w-96 py-10 px-5">
      <Link
        to="/horas-extras"
        className={`w-full p-3 text-[#2b0572] transition-all uppercase font-bold block mt-5 text-center rounded-lg border-b-1 ${activeLink === "/horas-extras" ? 'text-white bg-[#2b0572]': 'hover:text-white hover:bg-[#2b0572]'}`}
      >
        Ver Horas Extras
      </Link>
      <Link
        to="crear-hora-extra"
        className={`w-full p-3 text-[#2b0572] transition-all uppercase font-bold block mt-5 text-center rounded-lg border-b-1 ${activeLink === "/horas-extras/crear-hora-extra" ? 'text-white bg-[#2b0572]': 'hover:text-white hover:bg-[#2b0572]'}`}
      >
        Registrar Hora Extra
      </Link>
    </aside>
  );
}

export default Sidebar;

