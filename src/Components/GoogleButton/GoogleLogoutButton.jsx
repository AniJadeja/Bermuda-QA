import React from "react";
import { googleLogout } from "@react-oauth/google";
import useUserCookies from "../../hooks/useUserCookies";
import { useAuthStore } from "./index";

const GoogleLogoutButton = () => {
  const { setCookies } = useUserCookies();
  const { setLoggedIn } = useAuthStore();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "fit-content",
        width: "fit-content",
        position: "fixed",
        top: "2%",
        right: "2%",
        zIndex: "100",
        borderRadius: "100px",
        background: "white",
        fontSize: "13px",
      }}
    >
      <button
        style={{
          paddingRight: "20px",
          paddingLeft: "20px",
          borderRadius: "100px",
        }}
        onClick={() => {
          setCookies({
            user: "",
            pname: "",
          });
          setLoggedIn(false);
          googleLogout();
          window.location.href = window.location.origin;
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default GoogleLogoutButton;
