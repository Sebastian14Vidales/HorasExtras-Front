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
import useAdmin from "../hooks/useAdmin";

function ModalVerRegistro({
  isOpen,
  onOpenChange,
  asunto,
  descripcion,
  fechaHoraInicio,
  fechaHoraFin,
  horasTotal,
  creador,
  resultado,
  _id,
}) {

  const admin = useAdmin();

  return (
    <>
      <Modal
        className="flex-column"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
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
                {admin && (
                  <div className="text-left">
                    <p className="uppercase font-bold text-[#2b0572]">
                      Empleado:{" "}
                      <span className="font-normal text-black">
                        {creador.nombre}
                      </span>
                    </p>
                  </div>
                )}
                {admin ? (
                  <div className="flex justify-between text-center mt-2">
                    <p className="uppercase text-lg font-bold text-[#2b0572]">
                      Horas trabajadas{" "}
                      <span className="block text-2xl">{horasTotal}</span>
                    </p>
                    <p className="uppercase text-lg font-bold text-[#2b0572]">
                      Total a pagar{" "}
                      <span className="block text-orange-400 text-2xl">
                        {resultado.totalPago}
                      </span>
                    </p>
                  </div>
                ) : (
                  <div className="text-center mt-2">
                    <p className="uppercase text-xl font-bold text-[#2b0572]">
                      Horas trabajadas:{" "}
                      <span className="block">{horasTotal}</span>
                    </p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
                {!admin && (
                  <Link
                    to={`/horas-extras/editar/${_id}`}
                    className="btn btn-editar px-6 py-2"
                  >
                    Editar
                  </Link>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalVerRegistro;
