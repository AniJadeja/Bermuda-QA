import { Text } from "@react-three/drei";
import React, { useEffect } from "react";
import TextBox from "./TextBox";

const QuestionWrapper = ({ children, positions, fontSizes }) => {
  return (
    <>
      {React.Children.map(children, child => 
        React.cloneElement(child, { positions, fontSizes })
      )}
    </>
  );
};

const UserName = ({ children, positions, fontSizes }) => (
    <TextBox position={positions.userName} fontSize={fontSizes.userName}>
      {children} Asks,
    </TextBox>
  );

const QuestionText = ({ children, positions, fontSizes }) => {
  return <Text position={positions.questionText} fontSize={fontSizes.questionText} className="question-text">{children}</Text>;
};

const Answer = ({ children, positions, fontSizes }) => {
  return <Text position={positions.answer} fontSize={fontSizes.answer} className="answer">{children}</Text>;
};

const AnswerUserName = ({ children, positions, fontSizes }) => {
  return <Text position={positions.answerUserName} fontSize={fontSizes.answerUserName} className="answer-user-name">{children}</Text>;
};

QuestionWrapper.UserName = UserName;
QuestionWrapper.QuestionText = QuestionText;
QuestionWrapper.Answer = Answer;
QuestionWrapper.AnswerUserName = AnswerUserName;

export default QuestionWrapper;