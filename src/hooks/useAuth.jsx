import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Este hook me va a consultar el context del AuthProvider
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth