import AllPreviewHorasExtras from "../components/AllPreviewHorasExtras";
import PreviewHorasExtras from "../components/PreviewHorasExtras";
import useAdmin from "../hooks/useAdmin";
import useHorasExtras from "../hooks/useHorasExtras";

function HorasExtras() {
  const { horas, TodasHorasExtras } = useHorasExtras();
  const admin = useAdmin();

  return (
    <>
      <h1 className="text-4xl font-black"> {admin ? 'Todas Las Horas Extras' : 'Horas Extras'}</h1>
      {admin ? (
        TodasHorasExtras.length ? (
          TodasHorasExtras.map((hora) => <AllPreviewHorasExtras key={hora._id} horas={hora} />)
        ) : (
          <p>No hay proyectos</p>
        )
      ) : horas.length ? (
        horas.map((hora) => <PreviewHorasExtras key={hora._id} horas={hora} />)
      ) : (
        <p>No hay proyectos</p>
      )}
    </>
  );
}

export default HorasExtras;
