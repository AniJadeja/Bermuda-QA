import { useEffect } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import GoogleLogoutButton from "./GoogleLogoutButton";
import useUserCookie from "../../hooks/useUserCookies";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isLoggedIn: false,
  setLoggedIn: (value) => set({ isLoggedIn: value }),
}));

const AuthButton = () => {
  const { isLoggedIn, setLoggedIn } = useAuthStore();

  const { getCookies } = useUserCookie();
  const { user, pname } = getCookies();
  useEffect(() => {
    user && pname ? setLoggedIn(true) : setLoggedIn(false);

    // make an api call and validate the cookies
  }, []);

  return <>{isLoggedIn ? <GoogleLogoutButton /> : <GoogleLoginButton />}</>;
};

export default AuthButton;
