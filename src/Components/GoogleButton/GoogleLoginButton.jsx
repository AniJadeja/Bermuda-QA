import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import useUserCookies from "../../hooks/useUserCookies";
import { useAuthStore } from "./index"; // Ensure this path is correct

const GoogleLoginButton = () => {
  const { setCookies } = useUserCookies();
  const { setLoggedIn } = useAuthStore(); // Ensure setLoggedIn is correctly retrieved

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
      }}
    >
      <GoogleLogin
        shape="circle"
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          console.log(decoded);
          setCookies({
            user: decoded.email,
            pname: decoded.name,
          });

          setLoggedIn(true);
          window.location.href = window.location.origin;
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleLoginButton;
