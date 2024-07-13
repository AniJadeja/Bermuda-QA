import { addQuestionService } from "../../Services";
import AddQuestionModel from "./AddQuestionModel";

export const addQuestion = async (question, userId, asker, date) => {
  try {
    let response = await addQuestionService(question, userId, asker, date);

    if (response) {
      return new AddQuestionModel(response);
    } else {
      throw new Error("Invalid response !!");
    }
  } catch (error) {
    console.error(error);
    return new AddQuestionModel({ status: "0", desc: error.message });
  }
};