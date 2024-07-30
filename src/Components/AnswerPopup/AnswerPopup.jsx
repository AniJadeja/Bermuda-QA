import React, { useState, useEffect, useRef } from "react";
import AnswerItem from "./AnswerItem";
import "./AnswerPopup.css";
import { getAnswer } from "../../Features/GetAnswer/answerController";
import { create } from "zustand";
import { usePopupStore } from "../Popup/PopupButton";
import { useDisplayControl } from "./AnsController";
import { useCharacterState } from "../../Context/characterContext";
import { addUpVote } from "../../Features/AddUpvotes/upvoteController";
import { removeVote } from "../../Features/RemoveVote/removeVoteController";
import useUserCookies from "../../hooks/useUserCookies";

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

  const { cookies } = useUserCookies();
  const email = cookies.user;


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

  const handleVote = async (id, voteType, totalUpVotes) => {
    setIsLoading(true);
    try {
      const totalVotes =
        voteType == "up" ? totalUpVotes + 1 : totalUpVotes - 1;
      console.log("Vote type ", voteType)
      if (voteType == "up") {
        // upvote api needs user, ansid, totalupvotes,
        const upvoteResponse = await addUpVote(email, id, totalVotes);
        console.log("Upvote response : ", upvoteResponse);
        if (!upvoteResponse) throw new Error("Upvote response is null..");
      } else {
        console.log("Downvoting")
        const downvoteResponse = await removeVote(email, id, totalVotes);
        console.log("Downvote response : ", downvoteResponse);
        if (!downvoteResponse) throw new Error("Downvote response is null..");
      }
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
              onUpvote={() => handleVote(answer.id, "up", answer.upvote)}
              onDownvote={() => handleVote(answer.id, "down", answer.upvote)}
              pname={answer.pname}
              date={answer.date}
              user={answer.user}
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
