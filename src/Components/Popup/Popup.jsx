import React, { useState, useEffect, useRef } from "react";
import "./Popup.css";
import arrow from '/assets/Popup/arrow.svg'

const Popup = ({ name, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("ask");
  const [inputText, setInputText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const words = inputText.trim().split(/\s+/);
    setWordCount(words.length === 1 && words[0] === "" ? 0 : words.length);
  }, [inputText]);

  useEffect(() => {
    setIsVisible(true);
    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleEscKey = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClose();
    }
  };

  const handlePost = () => {
    console.log("Posting:", inputText);
    // Add your post logic here
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for the animation to finish before calling onClose
  };

  return (
    <div className={`popup-overlay ${isVisible ? 'visible' : ''}`}>
      <div ref={popupRef} className={`popup ${isVisible ? 'visible' : ''}`}>
        <div className="header">
          <button className="close-button" onClick={handleClose}></button>
          <div className="navButtons">
            <button
              className={`option ${selectedOption === "ask" ? "active" : ""}`}
              onClick={() => setSelectedOption("ask")}
            >
              Ask a Question
            </button>
            <button
              className={`option ${selectedOption === "post" ? "active" : ""}`}
              onClick={() => setSelectedOption("post")}
            >
              Post an Answer
            </button>
          </div>
          <div className={`slider ${selectedOption}`}></div>
        </div>
        <div className="content">
          <div className="avatar">{name[0].toUpperCase()}</div>
          <img alt="name highlight arrow" src={arrow} height={30} width={30} style={{
              transform:' rotate(90deg)',
              marginRight: '5px'
          }} />
          <p>{name}</p>
        </div>
        <textarea
          placeholder={`Something awesome you may want to ${
            selectedOption === "ask" ? "ask" : "answer"
          }...`}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <div className="footer">
          <span className="word-count">{wordCount}/70</span>
          <button className="post-button" onClick={handlePost}>
            POST →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;