import React, { useState, useEffect } from "react";
import "../styles/horasExtras.css";
import ModalVerRegistro from "./ModalVerRegistro";
import { Button, useDisclosure } from "@nextui-org/react";
import useHorasExtras from "../hooks/useHorasExtras";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";

function AllPreviewHorasExtras({ horas }) {
  const {
    asunto,
    descripcion,
    fechaHoraInicio,
    fechaHoraFin,
    horasTotal,
    creador,
    _id,
  } = horas;

  // let socket;
  const { calcularHorasNocturnasDiurnas } = useHorasExtras();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const resultado = calcularHorasNocturnasDiurnas(
    horasTotal,
    fechaHoraInicio,
    fechaHoraFin
  );

  const { auth } = useAuth();
  const { submitHorasExtras, eliminarHoraExtra, editarHora } = useHorasExtras();
  console.log(auth);

  let socket;

  useEffect(() => {
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("ver_registro", auth._id);
  }, []); // Se ejecuta una vez al montar el componente para inicializar el socket

  useEffect(() => {
    if (socket) {
      socket.on("hora_agregada", (hora) => {
        console.log("Hora recibida:", hora);
        submitHorasExtras(hora);
      });
      socket.on("hora_eliminada", (hora) => {
        eliminarHoraExtra(hora);
      });

      socket.on("hora_editada", (hora) => {
        editarHora(hora);
      });
    }
  });

  return (
    <div className="bg-white shadow-md transition-all mt-5 rounded-lg p-5">
      <div className="flex flex-col items-center lg:grid grid-cols-6 justify-between">
        <div className="col-span-2">
          <h1 className="text-lg font-bold uppercase text-[#2b0572]">
            {asunto}
          </h1>
          <p className="descripcion">{descripcion}</p>
        </div>
        <div className="mt-3 md:col-span-1">
          <div className="text-center mt-2">
            <p className="uppercase text-lg font-bold text-[#2b0572]">
              Horas <span className="block text-2xl">{horasTotal}</span>
            </p>
          </div>
        </div>
        <div className="mt-3 md:col-span-2">
          <div className="text-center mt-2">
            <p className="uppercase text-sm font-bold text-[#2b0572]">
              Horas Diurnas:{" "}
              <span className="text-orange-400">{resultado.horasDiurnas}</span>
            </p>
          </div>
          <div className="text-center mt-2">
            <p className="uppercase text-sm font-bold text-[#2b0572]">
              Horas Nocturnas:{" "}
              <span className="text-orange-400">
                {resultado.horasNocturnas}
              </span>
            </p>
          </div>
          <div className="text-center mt-2">
            <p className="uppercase text-sm font-bold text-gray-400">
              Empleado: <span className="">{creador.nombre}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-center mt-4 xl:mt-0 text-center">
          <div className="text-center">
            <p className="uppercase text-lg font-bold text-[#2b0572]">
              Valor Total{" "}
              <span className="block text-sm text-orange-400">
                {resultado.totalPago}
              </span>
            </p>
          </div>
          <Button
            className="mt-4 lg:mt-0 font-bold hover:bg-warning-600"
            onPress={onOpen}
            color="warning"
            variant="shadow"
          >
            Ver Registro
          </Button>
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
        creador={creador}
        resultado={resultado}
        _id={_id}
      />
    </div>
  );
}

export default AllPreviewHorasExtras;
