//QuestionWrapper.jsx
import React from "react";
const QuestionWrapper = ({ children }) => {
    return (
      <>
        <div className="question">{children}</div>
      </>
    );
  };
  
  // UserName.jsx
  const UserName = ({ children }) => {
    return <div className="user-name">{children}</div>;
  };
  
  // QuestionText.jsx
  const QuestionText = ({ children }) => {
    return <div className="question-text">{children}</div>;
  };
  
  // Answer.jsx
  const Answer = ({ children }) => {
    return <div className="answer">{children}</div>;
  };
  
  // AnswerUserName.jsx
  const AnswerUserName = ({ children }) => {
    return <div className="answer-user-name">{children}</div>;
  };
  
  QuestionWrapper.UserName = UserName;
  QuestionWrapper.QuestionText = QuestionText;
  QuestionWrapper.Answer = Answer;
  QuestionWrapper.AnswerUserName = AnswerUserName;

  export default QuestionWrapper;