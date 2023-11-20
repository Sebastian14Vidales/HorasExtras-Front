import React from "react";
import dayjs from 'dayjs';


function PreviewHorasExtras({ horas }) {
  const { asunto, descripcion, fechaHoraInicio, fechaHoraFin, _id } = horas;

  const fechaInicio = dayjs(fechaHoraInicio).format("DD/MM/YYYY hh:mm A");
  const fechaFin = dayjs(fechaHoraFin).format("DD/MM/YYYY hh:mm A");

  const diferenciaHoras = (fin, inicio) => {
    const diferencia = dayjs(fin).diff(dayjs(inicio), 'hours', true);
  const decimal = diferencia - Math.floor(diferencia); // Obtiene la parte decimal
  
  if (decimal >= 0.5) {
    return Math.ceil(diferencia);
  } else {
    return Math.floor(diferencia);
  }
  }
  console.log("REDONDEADO HACIA ARRIBA: ",diferenciaHoras(fechaHoraFin, fechaHoraInicio));
  const diferencia = dayjs(fechaHoraFin).diff(dayjs(fechaHoraInicio),'hours',true);
  console.log("VALOR REAL: ",diferencia);
  return (
    <div className="bg-white shadow-md mt-5 rounded-lg p-5">
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg font-bold uppercase text-[#2b0572]">{asunto}</h1>
          <p>{descripcion}</p>
        </div>
        <div className="text-right">
          <p className="text-[#2b0572] font-bold uppercase">Inicio: <span className="text-black font-normal">{fechaInicio}</span></p>
          <p className="text-[#2b0572] font-bold uppercase">Fin: <span className="text-black font-normal">{fechaFin}</span></p>
          <p>Horas: {diferenciaHoras(fechaHoraFin,fechaHoraInicio)}</p>
        </div>
      </div>
    </div>
  );
}

export default PreviewHorasExtras;
