import PreviewHorasExtras from "../components/PreviewHorasExtras";
import useHorasExtras from "../hooks/useHorasExtras";

function HorasExtras() {
  const { horas } = useHorasExtras();

  return (
    <>
      <h1 className="text-4xl font-black">Horas Extras</h1>

      {horas.length ? (
        horas.map((hora) => <PreviewHorasExtras key={hora._id} horas={hora} />)
      ) : (
        <p>No hay proyectos</p>
      )}
    </>
  );
}

export default HorasExtras;
