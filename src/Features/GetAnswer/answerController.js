import { getAnswerForQuestion } from "../../Services";
import AnswerModel from "./AnswerModel";

export const getAnswer = async (questionId) => {
  try {
    let response = await getAnswerForQuestion(questionId);
    if (response) {
      return new AnswerModel(response);
    } else {
      console.log("Question Id : ", questionId, "\n Response : ", response);
      throw new Error("Invalid response !!");
    }
  } catch (error) {
    console.log(error);
  }
};
