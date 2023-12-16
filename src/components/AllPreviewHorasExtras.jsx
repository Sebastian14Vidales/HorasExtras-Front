import React, { useEffect, useState } from "react";
import "../styles/horasExtras.css";
import ModalVerRegistro from "./ModalVerRegistro";
import { Button, useDisclosure } from "@nextui-org/react";
import useHorasExtras from "../hooks/useHorasExtras";
import io from "socket.io-client";

const URL = import.meta.env.VITE_BACKEND_URL;

export const initialSocket = io(URL, {
  autoConnect: true
});

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

  const { calcularHorasNocturnasDiurnas, submitHorasExtras } = useHorasExtras();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [socket] = useState(initialSocket);
  const resultado = calcularHorasNocturnasDiurnas(
    horasTotal,
    fechaHoraInicio,
    fechaHoraFin
  );

  // let socket;
  useEffect(() => {
    // setSocket(io(import.meta.env.VITE_BACKEND_URL));
    socket.emit("ver registro", _id);
  }, []);


  
  // useEffect(() => {
  //   socket.on("connection", () => {
  //     console.log('NUEVO CLIENTE CONECTADO...');
  //   })
  // })
  
  useEffect(() => {

    socket.on('hora_agregada', (mensaje) => {
      console.log("EVENTO HORA AGREGADA ====================================================", mensaje);
    })

  //   socket.on('nueva_hora', (hora) => {
  //     console.log("NUEVA HORA:", hora);
  //     try {
  //         // const creador = hora.creador;
  //         socket.emit('hora_agregada', hora);
  //     } catch (error) {
  //         console.error('Error al procesar nueva_hora:', error);
  //     }
  // });
  
    // console.log("socket:", socket);
    // socket.on("hora_agregada", (hora) => {
    //   console.log(hora);
    // });

  
    // if (socket) {
    //   // debugger;
    //   console.log('entra al if');
    // }
  });

  console.log(resultado);
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
