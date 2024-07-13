// // popup.jsx

// import React, { useState, useEffect, useRef } from "react";
// import "./Popup.css";
// import arrow from "/assets/Popup/arrow.svg";
// import { useCharacterState } from "../../Context/characterContext";
// import { addQuestionService } from "../../Services";
// import { addAnswerService } from "../../Services";
// import { usePopupStore } from "./PopupButton";
// import { useAuthStore } from "../../Features/Authentication/AuthStore";

// const Popup = ({ name, onClose }) => {
//   const [selectedOption, setSelectedOption] = useState("ask");
//   const [inputText, setInputText] = useState("");
//   const [wordCount, setWordCount] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const popupRef = useRef(null);

//   const { questionId } = usePopupStore();
//   const { email, userName } = useAuthStore();

//   const {
//     IS_CHARACTER_MOVABLE,
//     setCharacterMovable,
//     setCharacterControllable,
//     isCharacterControllable,
//   } = useCharacterState();

//   useEffect(() => {
//     const words = inputText.trim().split(/\s+/);
//     setWordCount(words.length === 1 && words[0] === "" ? 0 : words.length);
//   }, [inputText]);

//   useEffect(() => {
//     try {
//       if (isCharacterControllable) {
//         setCharacterMovable(false);
//         setCharacterControllable(false);
//       } else {
//         throw new Error("Character controls is in use");
//       }
//       setIsVisible(true);
//       document.addEventListener("keydown", handleEscKey);
//       document.addEventListener("mousedown", handleOutsideClick);

//       return () => {
//         document.removeEventListener("keydown", handleEscKey);
//         document.removeEventListener("mousedown", handleOutsideClick);
//         setCharacterMovable(true);
//         setCharacterControllable(true);
//       };
//     } catch (error) {
//       console.error(error);
//     }
//   }, []);

//   const handleEscKey = (event) => {
//     if (event.key === "Escape") {
//       handleClose();
//     }
//   };

//   const handleOutsideClick = (event) => {
//     if (popupRef.current && !popupRef.current.contains(event.target)) {
//       handleClose();
//     }
//   };

//   const handlePost = async () => {
//     console.log("Selected Option: ", selectedOption, " ", questionId);

//     const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

//     try {
//       let response;
//       if (selectedOption === "ask") {
//         //question, userId, asker, date
//         response = await addQuestionService(
//           inputText,
//           email,
//           userName,
//           currentDate
//         );
//       } else if (selectedOption === "post") {
//         // Assuming questionId is available. You might need to pass this as a prop or get it from some context
//         const qId = questionId;
//         response = await addAnswerService(
//           qId,
//           inputText, // answer
//           email,  //userId  
//           userName, // answerer
//           currentDate,
//           0 // upvote
//         );
//       }

//       if (response && response.status === "200") {
//         console.log("Successfully posted:", response);
//         // You might want to show a success message to the user
//         setInputText(""); // Clear the input
//         handleClose(); // Close the popup
//       } else {
//         console.error(
//           "Failed to post:",
//           response ? response.desc : "Unknown error"
//         );
//         // You might want to show an error message to the user
//       }
//     } catch (error) {
//       console.error("Error posting:", error);
//       // You might want to show an error message to the user
//     }
//   };

//   const handleClose = () => {
//     setIsVisible(false);
//     setTimeout(onClose, 300); // Wait for the animation to finish before calling onClose
//   };

//   return (
//     isVisible && (
//       <div className={`popup-overlay ${isVisible ? "visible" : ""}`}>
//         <div ref={popupRef} className={`popup ${isVisible ? "visible" : ""}`}>
//           <div className="header">
//             <button className="close-button" onClick={handleClose}></button>
//             <div className="navButtons">
//               <button
//                 className={`option ${selectedOption === "ask" ? "active" : ""}`}
//                 onClick={() => setSelectedOption("ask")}
//               >
//                 Ask a Question
//               </button>
//               <button
//                 className={`option ${
//                   selectedOption === "post" ? "active" : ""
//                 }`}
//                 onClick={() => setSelectedOption("post")}
//               >
//                 Post an Answer
//               </button>
//             </div>
//             <div className={`slider ${selectedOption}`}></div>
//           </div>
//           <div className="content">
//             <div className="avatar">{name ? name[0].toUpperCase() : null}</div>
//             <img
//               alt="name highlight arrow"
//               src={arrow}
//               height={30}
//               width={30}
//               style={{
//                 transform: "rotate(90deg)",
//                 marginRight: "5px",
//               }}
//             />
//             <p>{name}</p>
//           </div>
//           <textarea
//             placeholder={`Something awesome you may want to ${
//               selectedOption === "ask" ? "ask" : "answer"
//             }...`}
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//           />
//           <div className="footer">
//             <span className="word-count">{wordCount}/70</span>
//             <button className="post-button" onClick={handlePost}>
//               POST →
//             </button>
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default Popup;
import React, { useState, useEffect, useRef } from "react";
import "./Popup.css";
import arrow from "/assets/Popup/arrow.svg";
import { useCharacterState } from "../../Context/characterContext";
import { addQuestionService } from "../../Services";
import { addAnswerService } from "../../Services";
import { usePopupStore } from "./PopupButton";
import { useAuthStore } from "../../Features/Authentication/AuthStore";

const Popup = ({ name, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("ask");
  const [inputText, setInputText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef(null);

  const { questionId } = usePopupStore();
  const { email, userName } = useAuthStore();

  const {
    IS_CHARACTER_MOVABLE,
    setCharacterMovable,
    setCharacterControllable,
    isCharacterControllable,
  } = useCharacterState();

  useEffect(() => {
    const words = inputText.trim().split(/\s+/);
    setWordCount(words.length === 1 && words[0] === "" ? 0 : words.length);
  }, [inputText]);

  useEffect(() => {
    try {
      if (isCharacterControllable) {
        setCharacterMovable(false);
        setCharacterControllable(false);
      } else {
        throw new Error("Character controls is in use");
      }
      setIsVisible(true);
      document.addEventListener("keydown", handleEscKey);
      document.addEventListener("mousedown", handleOutsideClick);

      return () => {
        document.removeEventListener("keydown", handleEscKey);
        document.removeEventListener("mousedown", handleOutsideClick);
        setCharacterMovable(true);
        setCharacterControllable(true);
      };
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      handleClose();
    }
  };

  const handlePost = async () => {
    console.log("Selected Option: ", selectedOption, " ", questionId);

    const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

    setIsLoading(true);
    try {
      let response;
      if (selectedOption === "ask") {
        response = await addQuestionService(
          inputText,
          email,
          userName,
          currentDate
        );
      } else if (selectedOption === "post") {
        const qId = questionId;
        response = await addAnswerService(
          qId,
          inputText,
          email,
          userName,
          currentDate,
          0
        );
      }

      if (response && response.status === "200") {
        console.log("Successfully posted:", response);
        setInputText("");
        handleClose();
      } else {
        console.error(
          "Failed to post:",
          response ? response.desc : "Unknown error"
        );
        // You might want to show an error message to the user
      }
    } catch (error) {
      console.error("Error posting:", error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for the animation to finish before calling onClose
  };

  return (
    isVisible && (
      <div className={`popup-overlay ${isVisible ? "visible" : ""}`}>
        <div ref={popupRef} className={`popup ${isVisible ? "visible" : ""}`}>
          {isLoading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
            </div>
          )}
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
                className={`option ${
                  selectedOption === "post" ? "active" : ""
                }`}
                onClick={() => setSelectedOption("post")}
              >
                Post an Answer
              </button>
            </div>
            <div className={`slider ${selectedOption}`}></div>
          </div>
          <div className="content">
            <div className="avatar">{name ? name[0].toUpperCase() : null}</div>
            <img
              alt="name highlight arrow"
              src={arrow}
              height={30}
              width={30}
              style={{
                transform: "rotate(90deg)",
                marginRight: "5px",
              }}
            />
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
    )
  );
};

export default Popup;