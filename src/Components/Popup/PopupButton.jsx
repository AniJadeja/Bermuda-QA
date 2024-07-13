import { useState } from "react";
import Popup from "./Popup";
import qa from "/assets/Popup/chat.svg";
import { create } from "zustand";
import { useAuthStore } from "../../Features/Authentication/AuthStore";

export const usePopupStore = create((set) => ({
  showPopup: false,
  questionId : null,
  setShowPopup: (state) => set({ showPopup: state }),
  setQuestionId : (id) => set ({questionId : id})
}));

const PopupButton = () => {
  const { showPopup, setShowPopup } = usePopupStore();
  const { userName } = useAuthStore();
  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button
        style={{
          position: "fixed",
          bottom: 20,
          zIndex: 101,
          paddingLeft: "12px",
          paddingRight: "12px",
        }}
        className="open-popup-button"
        onClick={() => (showPopup ? setShowPopup(false) : setShowPopup(true))}
      >
        <img
          src={qa}
          alt="Question and Answer Button"
          style={{
            height: "30px",
            width: "auto",
            marginTop: "5px",
            marginBottom: "3px",
            marginLeft: "5px",
            marginRight: "5px",
          }}
        />
      </button>
      {showPopup && <Popup name={userName} onClose={handleClose} />}
    </>
  );
};

export default PopupButton;
