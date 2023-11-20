import useHorasExtras from "../hooks/useHorasExtras";

function HorasExtras() {
  const { horas } = useHorasExtras();
  console.log(horas.length);
  return (
    <>
      <h1 className="text-4xl font-black">Horas Extras</h1>

      <div className="bg-white shadow-md mt-10 rounded-lg p-5">
        {horas.length ? (
          horas.map((hora) => (
            <div key={hora._id}>
              <p>Asunto: {hora.asunto}</p>
              <p>Descripción: {hora.descripcion}</p>
            </div>
          ))
        ) : (
          <p>No hay proyectos</p>
        )}
      </div>
    </>
  );
}

export default HorasExtras;
