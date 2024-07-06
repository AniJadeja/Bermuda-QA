import React from "react";
import AnswerPopup from "./AnswerPopup";
import AnswerBox from "../AnswerPopup/AnswerBox";
import { create } from 'zustand';
import { useDisplayControl } from "./AnsController";


const DisplayAnswers = () => {
  const { showAnswers, toggle } = useDisplayControl();
  const openAnswersPopup = () => {
    console.log("Opening the answer popup");
    toggle();
  };

  return (
    <>
      <AnswerBox onClick={openAnswersPopup}>Show Answers</AnswerBox>
    </>
  );
};

export default DisplayAnswers;
