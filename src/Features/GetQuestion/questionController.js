import { getQuestionAndData } from "../../Services";
import QuestionModel from "./questionModel";

export const getQuestion = async (question) => {
  try {
    let response = await getQuestionAndData(question);
    if (response) {
        return new QuestionModel(response);
    }
    else{
        throw new Error("Invalid response !!");
    }
  } catch (error) {
    console.error(error)
  }
};


