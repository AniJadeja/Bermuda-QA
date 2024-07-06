import React from "react";
import AnswerPopup from "./AnswerPopup";
import { create } from "zustand";
import { usePopupStore } from "../Popup/PopupButton";

export const useDisplayControl = create((set) => ({
  showAnswers: false,
  toggle: () => set((state) => ({ showAnswers: !state.showAnswers })),
}));

const AnsController = () => {
  const { showAnswers, toggle } = useDisplayControl();
  const { showPopup, setShowPopup } = usePopupStore();
  const handlePostAnswer = () => {
    toggle();
    setTimeout(() => {
      setShowPopup(true);
    }, 300); // 300ms delay
  };
  

  return (
    <>
      {showAnswers && (
        <AnswerPopup onClose={toggle} onPostAnswer={handlePostAnswer} />
      )}
    </>
  );
};

export default AnsController;
