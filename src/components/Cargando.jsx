import React from "react";
import { Spinner } from "@nextui-org/react";

function Cargando() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-4">
        <Spinner color="primary" />
      </div>
    </div>
  );
}

export default Cargando;
