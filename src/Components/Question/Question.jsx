import React, { useEffect, useState } from "react";
import { Html, MarchingPlane, Text } from "@react-three/drei";
import QuestionWrapper from "./QuestionWrapper";
import { getQuestionFromURL } from "../../utils/browserUtils";
import { getQuestion } from "../../Features/GetQuestion/questionController";
import { getAnswer } from "../../Features/GetAnswer/answerController";

const Question = () => {
  const LOADING = "Loading";
  const FAILED = "Failed";
  const SUCCESS = "Success";

  const [questioner, setQuestioner] = useState("");
  const [question, setQuestion] = useState("");
  const [answerer, setAnswerer] = useState("");
  const [answer, setAnswer] = useState("");

  const [dataLoaded, setDataLoaded] = useState(LOADING);

  useEffect(() => {
    (async () => {
      try {
        setDataLoaded(LOADING);
        const question = getQuestionFromURL();
        setQuestion(question + "?");
        const questionData = await getQuestion(question);
        if (!questionData) {
          setDataLoaded(FAILED);
          return;
        }
        setQuestion(questionData.question);
        setQuestioner(questionData.asker);
        const answerData = await getAnswer(questionData.id);
        if (!answerData) {
          setDataLoaded(FAILED);
          return;
        }
        setAnswerer(answerData.pname);
        setAnswer(answerData.answer);
        setDataLoaded(SUCCESS);
      } catch (error) {
        setDataLoaded(FAILED);
        console.error(error);
      }
    })();
  }, []);

  const positions = {
    userName: [1.8, 4.2, -10.85],
    //userName: [0, 1, 0],
    questionText: [3.05, 3, -10.85],
    answer: [3.05, 1.6, -10.85],
    answerUserName: [1.2, 2.1, -10.85],
  };

  const fontSizes = {
    userName: 0.2,
    questionText: 0.3,
    answer: 0.3,
    answerUserName: 0.3,
  };
  let returnData;

  if (dataLoaded === SUCCESS) {
    returnData = (
      <QuestionWrapper positions={positions} fontSizes={fontSizes}>
        <QuestionWrapper.UserName>{questioner}</QuestionWrapper.UserName>
        <QuestionWrapper.QuestionText>{question}</QuestionWrapper.QuestionText>
        <QuestionWrapper.Answer>{answer}</QuestionWrapper.Answer>
        <QuestionWrapper.AnswerUserName>
          {answerer}
        </QuestionWrapper.AnswerUserName>
      </QuestionWrapper>
    );
  } else if (dataLoaded === LOADING) {
    returnData = (
      <Text position={positions.questionText} fontSize={0.4}>
        Loading ...
      </Text>
    );
  } else if (dataLoaded === FAILED) {
    returnData = (
      <Text
        position={positions.questionText}
        fontSize={0.3}
        maxWidth={5}
        lineHeight={1.2}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        No answer found for the question : {question}
      </Text>
    );
  }

  return returnData;
};

export default Question;
