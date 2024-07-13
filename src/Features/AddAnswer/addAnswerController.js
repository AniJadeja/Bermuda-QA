import { addAnswerService } from "../../Services";
import AddAnswerModel from "./AddAnswerModel";

export const addAnswer = async (questionId, answer, userId, answerer, date, upvote) => {
  try {
    let response = await addAnswerService(questionId, answer, userId, answerer, date, upvote);

    if (response) {
      return new AddAnswerModel(response);
    } else {
      throw new Error("Invalid response !!");
    }
  } catch (error) {
    console.error(error);
    return new AddAnswerModel({ status: "0", desc: error.message });
  }
};