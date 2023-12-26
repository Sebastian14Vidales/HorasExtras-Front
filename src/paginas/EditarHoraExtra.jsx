import { useParams } from "react-router-dom";
import useHorasExtras from "../hooks/useHorasExtras.jsx";
import { useEffect } from "react";
import Cargando from "../components/Cargando.jsx";
import FormularioHora from "../components/FormularioHora.jsx";

function EditarHoraExtra() {
  const params = useParams();
  const { obtenerHora, hora, cargando } = useHorasExtras();

  useEffect(() => {
    obtenerHora(params.id);
  }, []);

  const { asunto } = hora;
  return cargando ? (
    <Cargando />
  ) : (
    <>
      <h1 className="text-4xl font-black">Editar Hora Extra: {asunto}</h1>

      <div className="mt-10 flex justify-center">
        <FormularioHora />
      </div>
    </>
  );
}

export default EditarHoraExtra;
