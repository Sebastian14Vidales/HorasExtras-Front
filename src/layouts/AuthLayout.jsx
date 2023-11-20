import { Outlet } from "react-router-dom";
import EfectGradient from "../components/EfectGradient";

function AuthLayout() {
  return (
    <main className="overflow-hidden principal">
      <EfectGradient />
      <div className="flex p-2 sm:p-0 min-h-screen items-center justify-around">
        <div className="flex flex-col rounded-3xl bg-gray-600 bg-opacity-20 shadow-2xl relative w-[450px]">
          <div className=" ">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
