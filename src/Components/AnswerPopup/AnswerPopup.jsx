import React, { useState, useEffect, useRef } from "react";
import AnswerItem from "./AnswerItem";
import "./AnswerPopup.css";
import { getAnswer } from "../../Features/GetAnswer/answerController";
import { create } from "zustand";
import { usePopupStore } from "../Popup/PopupButton";
import { useDisplayControl } from "./AnsController";
import { useCharacterState } from "../../Context/characterContext";

export const useAnswerStore = create((set) => ({
  answers: [],
  setAnswers: (newAnswers) => set({ answers: newAnswers }),
}));

const AnswerPopup = ({ onClose, onPostAnswer }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef(null);
  const { showPopup, setShowPopup } = usePopupStore();
  const { answers, setAnswers } = useAnswerStore();
  const { showAnswers, toggle } = useDisplayControl();
  const {
    IS_CHARACTER_MOVABLE,
    setCharacterMovable,
    setCharacterControllable,
    isCharacterControllable,
  } = useCharacterState();

  useEffect(() => {
    try {
      if (isCharacterControllable) {
        setCharacterMovable(false);
        setCharacterControllable(false);
      } else {
        throw new Error("Character controls is in use");
      }

      setIsVisible(true);
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscKey);
      console.log("Answers in popup : ", answers);
      return () => {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleEscKey);
        setCharacterMovable(true);
        setCharacterControllable(true);
      };
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClose();
    }
  };

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  const handleVote = async (id, voteType) => {
    setIsLoading(true);
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Update the vote count here based on the response
      console.log(`Voted ${voteType} for answer ${id}`);
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`popup-overlay ${isVisible ? "visible" : ""}`}>
      <div
        ref={popupRef}
        className={`answer-popup ${isVisible ? "visible" : ""}`}
      >
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        <button className="close-button" onClick={handleClose}></button>
        <h2>Answers</h2>
        <div className="answers-list">
          {answers.map((answer, index) => (
            <AnswerItem
              key={answer.id}
              id={answer.id}
              content={answer.answer}
              votes={answer.upvote}
              onUpvote={() => handleVote(answer.id, "up")}
              onDownvote={() => handleVote(answer.id, "down")}
              pname={answer.pname}
              date={answer.date}
            />
          ))}
        </div>
        <div className="post-answer-container">
          <button className="post-answer-button" onClick={onPostAnswer}>
            Post Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerPopup;
