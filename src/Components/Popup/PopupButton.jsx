import { useState } from "react";
import Popup from "./Popup";
import qa from "/assets/Popup/qmark.svg";
import correct from "/assets/Popup/correct.svg";
import { create } from "zustand";
import useUserCookies from "../../hooks/useUserCookies";

export const usePopupStore = create((set) => ({
  showPopup: false,
  questionId: null,
  setShowPopup: (state) => set({ showPopup: state }),
  setQuestionId: (id) => set({ questionId: id }),
}));

const PopupButton = () => {
  const { showPopup, setShowPopup } = usePopupStore();
  const { getCookies } = useUserCookies();
  const userName = getCookies().pname;
  const handleClose = () => {
    setShowPopup(false);
  };
  return (
    <>
      <div className="popup-buttons-container">
        <button
          title="Ask a Question"
          className="open-popup-button"
          onClick={() => (showPopup ? setShowPopup(false) : setShowPopup(true))}
        >
          <img
            src={qa}
            alt="Question and Answer Button"
            className="button-icon"
          />
        </button>
  
        <button
          className="open-answer-button"
          onClick={() => (showPopup ? setShowPopup(false) : setShowPopup(true))}
        >
          <img
            title="Post an answer of the question"
            src={correct}
            alt="Question and Answer Button"
            className="button-icon"
          />
        </button>
      </div>
  
      {showPopup && <Popup name={userName} onClose={handleClose} />}
    </>
  );
};

export default PopupButton;
