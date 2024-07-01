import React from "react";
import { Html, MarchingPlane } from "@react-three/drei";
import QuestionWrapper from "./QuestionWrapper";

const Question = () => {
  return (
    <Html
      position={[3.4, 2.1, -10.85]}
      occlude="blending"
      transform
      style={{
        height:'130px',
        width:'246px',
        fontSize: "12px",
        backgroundColor: "black",
        padding: "0px",
        border: "5px 5px #fff",
        willChange: "transform",
        backfaceVisibility: "hidden",
        transform: "translateZ(0)",
        fontOpticalSizing: "auto",
        fontWeight: "600",
        fontStyle: "normal",
        letterSpacing : '0.5px',
        userSelect:'none',
      }}
    >
      <QuestionWrapper>
        <QuestionWrapper.UserName position={[1, 4, 3]}>
          UserName
        </QuestionWrapper.UserName>
        <QuestionWrapper.QuestionText>
          QuestionText
        </QuestionWrapper.QuestionText>
        <QuestionWrapper.Answer>Answer</QuestionWrapper.Answer>
        <QuestionWrapper.AnswerUserName>
          AnswerUserName
        </QuestionWrapper.AnswerUserName>
      </QuestionWrapper>
    </Html>
  );
};

export default Question;
