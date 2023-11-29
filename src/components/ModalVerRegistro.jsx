import { Link } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import dayjs from "dayjs";

// import { useState, useEffect } from "react";

function ModalVerRegistro({
  isOpen,
  onOpenChange,
  asunto,
  descripcion,
  fechaHoraInicio,
  fechaHoraFin,
  horasTotal,
  _id,
}) {
  return (
    <>
      <Modal backdrop="opaque" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-[#2b0572] text-2xl font-extrabold uppercase flex flex-col gap-1">
                {asunto}
              </ModalHeader>
              <ModalBody>
                <p>{descripcion}</p>
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
                <div className="text-center mt-2">
                  <p className="uppercase text-lg font-bold text-[#2b0572]">
                    Horas trabajadas: <span className="block text-4xl">{horasTotal}</span>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                <Link to={`/horas-extras/editar/${_id}`} className="btn btn-editar px-6 py-2">
                  Editar
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalVerRegistro;
