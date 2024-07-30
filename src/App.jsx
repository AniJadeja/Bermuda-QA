// App.jsx

import Scene from "./Components/Scene";
import Nipple from "react-nipple";
import { movementCharacter } from "./Components/Character/CharacterControls.jsx";
import { useCameraControlStore } from "./Components/GlobalData/GlobalData";
import PopupButton from "./Components/Popup/PopupButton";
import { useMobileScreen } from "./Context/ScreenContext.jsx";
import { useCallback, useEffect } from "react";
import { useCharacterState } from "./Context/characterContext.jsx";
import AnsController from "./Components/AnswerPopup/AnsController.jsx";
import { useLoadStatusStore } from "./Components/Scene";
import useUserCookies from "./hooks/useUserCookies";

const AuthError = () => {
  return <h4>User sign in needed..</h4>;
};

function App() {
  const { isLoading } = useLoadStatusStore();

  const { cookies, setCookies } = useUserCookies();
  const email = cookies.user;
  const userName = cookies.pname;

  const joyStickStart = useCallback((data) => {
    if (data.distance > 0) {
      // Calculate angle in radians
      const angleRad = (data.angle.degree * Math.PI) / 180;

      // Convert angle to movement directions
      movementCharacter.x = -Math.cos(angleRad);
      movementCharacter.z = Math.sin(angleRad);
    }
  }, []);

  useEffect(() => {


    setCookies({
      user: "abc@newmail.com",
      pname:"abc"
    })

    // TODO : handle signin logic here.
    if (!(email && userName)) {
      // redirect user and get the info
    }

    // only set these when user has authenticated

    // setCookies({
    //   user: email,
    //   pname: userName,
    // });

   
    // The above values are set for debugging purposes only
  }, []);

  const joyStickEnd = (d) => {
    movementCharacter.z = 0;
    movementCharacter.x = 0;
  };

  const isMobileScreen = useMobileScreen();
  //  const isMobileScreen = true;
  const { isCharacterControllable, setCharacterControllable } =
    useCharacterState();

  return email && userName ? (
    <div>
      {!isLoading ? (
        <>
          <AnsController />
          <PopupButton />
        </>
      ) : null}

      <Scene />
      {isMobileScreen && isCharacterControllable ? (
        <Nipple
          options={{
            mode: "static",
            position: { bottom: "50px", left: "50px" },
          }}
          style={{
            width: 100,
            height: 100,
            position: "absolute",
            bottom: "50px",
            left: "50px",
          }}
          onMove={(evt, data) => {
            if (data) {
              joyStickStart(data);
            }
          }}
          onEnd={(e, d) => joyStickEnd(d)}
        />
      ) : null}
    </div>
  ) : (
    <AuthError />
  );
}

export default App;
