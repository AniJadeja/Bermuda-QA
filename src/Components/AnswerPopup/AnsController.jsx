import React from "react";
import AnswerPopup from "./AnswerPopup";
import { create } from "zustand";


export const useDisplayControl = create((set) => ({
  showAnswers: false,
  toggle: () => set((state) => ({ showAnswers: !state.showAnswers })),
}));

const AnsController = () => {
  const { showAnswers, toggle } = useDisplayControl();

  const handlePostAnswer = () => {
    console.log("Posting a new answer");
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
