import { useState } from "react";
import dayjs from "dayjs"; // Importa la librería Day.js

import { Button, Input, Textarea } from "@nextui-org/react";
import DateTimePickerView from "./DateTimePickerView.jsx";

import useHorasExtras from "../hooks/useHorasExtras.jsx";
import Alert from "./Alert.jsx";

function FormularioHora() {
  const [asunto, setAsunto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [horaInicial, setHoraInicial] = useState("");
  const [horaFinal, setHoraFinal] = useState("");

  const { mostrarAlerta, alerta, submitHoras } = useHorasExtras(); //Usamos el Context de Horas Extras el cual es HorasExtrasProvider
  

  const handleHoraInicialChange = (hora) => {
    setHoraInicial(dayjs(hora.$d).format("YYYY-MM-DD HH:mm:ss"));
  };
  const handleHoraFinalChange = (hora) => {
    setHoraFinal(dayjs(hora.$d).format("YYYY-MM-DD HH:mm:ss"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([asunto, descripcion, horaInicial, horaFinal].includes("")) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      })
      return;
    }
    await submitHoras({asunto, descripcion, horaInicial, horaFinal})
    
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
