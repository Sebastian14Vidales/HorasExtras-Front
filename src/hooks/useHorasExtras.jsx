import { useContext } from "react";
import HorasExtrasContext from "../context/HorasExtrasProvider";

// Este hook me va a consultar el context del AuthProvider
const useHorasExtras = () => {
    return useContext(HorasExtrasContext);
}

export default useHorasExtras