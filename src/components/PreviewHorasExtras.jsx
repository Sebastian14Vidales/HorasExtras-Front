import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "../styles/horasExtras.css";
import ModalVerRegistro from "./ModalVerRegistro";
import { Button, useDisclosure } from "@nextui-org/react";

function PreviewHorasExtras({ horas }) {
  const {
    asunto,
    descripcion,
    fechaHoraInicio,
    fechaHoraFin,
    horasTotal,
    _id,
  } = horas;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="bg-white shadow-md mt-5 rounded-lg p-5">
      <div className="flex flex-col lg:grid grid-cols-5 justify-between">
        <div className="col-span-2">
          <h1 className="text-lg font-bold uppercase text-[#2b0572]">
            {asunto}
          </h1>
          <p className="descripcion">{descripcion}</p>
        </div>
        <div className="mt-3 md:col-span-2">
          <div className="text-center">
            <p className="text-[#2b0572] font-bold uppercase">
              Inicio:{" "}
              <span className="text-black font-normal">
                {dayjs(fechaHoraInicio).format("DD/MM/YYYY hh:mm A")}
              </span>
            </p>
            <p className="text-[#2b0572] font-bold uppercase">
              Fin:{" "}
              <span className="text-black font-normal">
                {dayjs(fechaHoraFin).format("DD/MM/YYYY hh:mm A")}
              </span>
            </p>
          </div>
          <div className="text-center mt-2">
            <p className="uppercase text-lg font-bold text-[#2b0572]">
              Horas <span className="block text-2xl">{horasTotal}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center text-center">
          <Button className="font-bold" onPress={onOpen} color="warning" variant="shadow">
            Ver Registro
          </Button>

          {/* <Link className="btn btn-eliminar px-6 py-2">Eliminar</Link>  */}
        </div>
      </div>
      <ModalVerRegistro
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        asunto={asunto}
        descripcion={descripcion}
        fechaHoraInicio={fechaHoraInicio}
        fechaHoraFin={fechaHoraFin}
        horasTotal={horasTotal}
        _id={_id}
      />
    </div>
  );
}

export default PreviewHorasExtras;
