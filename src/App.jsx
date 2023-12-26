import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import RutaProtegida from "./layouts/RutaProtegida";

import Login from "./paginas/Login";
import ForgotPassword from "./paginas/ForgotPassword";
import Register from "./paginas/Register";
import NewPassword from "./paginas/NewPassword";
import ConfirmAccount from "./paginas/ConfirmAccount";
import HorasExtras from "./paginas/HorasExtras";
import RegistrarHoraExtra from "./paginas/RegistrarHoraExtra";

import { AuthProvider } from "./context/AuthProvider";
import { HorasExtrasProvider } from "./context/HorasExtrasProvider";
import EditarHoraExtra from "./paginas/EditarHoraExtra";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <HorasExtrasProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm/:id" element={<ConfirmAccount />} />
            </Route>

            {/* Aquí empieza el area restringuida. Donde el usuario debe estar autenticado */}
            <Route path="/horas-extras" element={<RutaProtegida />}>
              <Route index element={<HorasExtras />} />
              <Route path="crear-hora-extra" element={<RegistrarHoraExtra />} />
              <Route path="editar/:id" element={<EditarHoraExtra />} />
            </Route>
          </Routes>
        </HorasExtrasProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
