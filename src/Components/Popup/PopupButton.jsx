import { useState } from "react";
import Popup from "./Popup";
import qa from "/assets/Popup/qmark.svg";
import correct from "/assets/Popup/correct.svg";
import { create } from "zustand";
import { useAuthStore } from "../../Features/Authentication/AuthStore";

export const usePopupStore = create((set) => ({
  showPopup: false,
  questionId: null,
  setShowPopup: (state) => set({ showPopup: state }),
  setQuestionId: (id) => set({ questionId: id }),
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
        }}
        title="Ask a Question"
        className="open-popup-button"
        onClick={() => (showPopup ? setShowPopup(false) : setShowPopup(true))}
      >
        <img
          src={qa}
          alt="Question and Answer Button"
          style={{
            height: "15px",
            width: "auto",
            marginLeft: "-40px",
            marginRight: "-40px",
            marginTop: "-40px",
            marginRight: "-40px",
          }}
        />
      </button>

      <button
        style={{
          position: "fixed",
          bottom: 20,
          zIndex: 101,
        }}
        className="open-answer-button"
        onClick={() => (showPopup ? setShowPopup(false) : setShowPopup(true))}
      >
        <img
          title="Post an answer of the question"
          src={correct}
          alt="Question and Answer Button"
          style={{
            height: "15px",
            width: "auto",
            marginLeft: "-40px",
            marginRight: "-40px",
            marginTop: "-40px",
            marginRight: "-40px",
          }}
        />
      </button>

      {showPopup && <Popup name={userName} onClose={handleClose} />}
    </>
  );
};

export default PopupButton;
