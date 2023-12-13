import useAuth from "./useAuth";
import useHorasExtras from "./useHorasExtras";

const useAdmin = () => {
  const { auth } = useAuth();
  const { hora } = useHorasExtras();

  console.log(auth);
  console.log(hora);

  return auth.email === 'admin@admin.com'
};

export default useAdmin;
