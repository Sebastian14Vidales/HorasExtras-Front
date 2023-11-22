import { useState, useEffect } from "react";
import dayjs from "dayjs"; // Importa la librería Day.js

import { Button, Input, Textarea } from "@nextui-org/react";
import DateTimePickerView from "./DateTimePickerView.jsx";

import useHorasExtras from "../hooks/useHorasExtras.jsx";
import Alert from "./Alert.jsx";

function FormularioHora() {
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaHoraInicio, setFechaHoraInicio] = useState("");
  const [fechaHoraFin, setFechaHoraFin] = useState("");
  const [horasTotal, setHorasTotal] = useState(0);

  const { mostrarAlerta, alerta, submitHoras } = useHorasExtras(); //Usamos el Context de Horas Extras el cual es HorasExtrasProvider
  

  const handleHoraInicialChange = (hora) => {
    setFechaHoraInicio(dayjs(hora.$d).format("YYYY-MM-DDTHH:mm:ssZ"));
  };
  const handleHoraFinalChange = (hora) => {
    setFechaHoraFin(dayjs(hora.$d).format("YYYY-MM-DDTHH:mm:ssZ"));
  };

  const diferenciaHoras = (fin, inicio) => {
    const diferencia = dayjs(fin).diff(dayjs(inicio), "hours", true);
    const decimal = diferencia - Math.floor(diferencia); // Obtiene la parte decimal

    if (decimal >= 0.5) {
      return Math.ceil(diferencia);
    } else {
      return Math.floor(diferencia);
    }
  };

  useEffect(() => {
    if(fechaHoraInicio && fechaHoraFin) {
      setHorasTotal(diferenciaHoras(fechaHoraFin, fechaHoraInicio));
      console.log(horasTotal);
    }
  }, [fechaHoraInicio, fechaHoraFin])
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([asunto, descripcion, fechaHoraInicio, fechaHoraFin].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return;
    }
    console.log("await: ", horasTotal);
    await submitHoras({asunto, descripcion, fechaHoraInicio, fechaHoraFin, horasTotal})
  };

  const { msg } = alerta;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-2xl"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alerta={alerta}/>}
      <div>
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="asunto"
        >
          Asunto
        </label>

        <Input
          className="mt-2"
          id="asunto"
          type="text"
          variant="flat"
          label="Ingresa tu asunto"
          onChange={(e) => setAsunto(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Descripción
        </label>

        <Textarea
          id="descripcion"
          type="text"
          placeholder="Ingresa tu descripción"
          className="max-w-full"
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Fecha y Hora Inicial
        </label>

        <DateTimePickerView onChangeDateTime={handleHoraInicialChange} />
      </div>
      <div className="mt-4">
        <label
          className="text-gray-700 uppercase font-bold text-sm"
          htmlFor="descripcion"
        >
          Fecha y Hora Final
        </label>

        <DateTimePickerView onChangeDateTime={handleHoraFinalChange} />
      </div>
      <Button
        type="submit"
        className="bg-[#2b0572] btn-login w-full rounded-3xl text-white transition-all uppercase font-bold duration-300 mt-6"
      >
        Registrar Hora Extra
      </Button>
    </form>
  );
}

export default FormularioHora;
