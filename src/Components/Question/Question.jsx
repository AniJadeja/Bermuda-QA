import React, { useEffect } from "react";
import { Html, MarchingPlane } from "@react-three/drei";
import QuestionWrapper from "./QuestionWrapper";
import { getQuestionFromURL } from "../../utils/browserUtils";
import { getQuestion } from "../../Features/GetQuestion/questionController";
import { getAnswer } from "../../Features/GetAnswer/answerController";

const Question = () => {
  useEffect(() => {
    (async () => {
      const question = getQuestionFromURL();
      const questionData = await getQuestion(question);
      const answerData = await getAnswer(questionData.id);
      //   console.log("Answer : ", answerData);
    })();
  }, []);

  const positions = {
    userName: [1.8, 4.2, -10.85],
    //userName: [0, 1, 0],
    questionText: [3.4, 1.9, -10.85],
    answer: [3.4, 1.7, -10.85],
    answerUserName: [3.4, 1.5, -10.85],
  };

  const fontSizes= {
    userName: 0.2,
    questionText: 0.3,
    answer: 0.2,
    answerUserName: 0.5,
  }

  return (
    <QuestionWrapper positions={positions} fontSizes={fontSizes}>
      <QuestionWrapper.UserName>UserName</QuestionWrapper.UserName>
      <QuestionWrapper.QuestionText>QuestionText</QuestionWrapper.QuestionText>
      <QuestionWrapper.Answer>Answer</QuestionWrapper.Answer>
      <QuestionWrapper.AnswerUserName>
        AnswerUserName
      </QuestionWrapper.AnswerUserName>
    </QuestionWrapper>
  );
};

export default Question;
