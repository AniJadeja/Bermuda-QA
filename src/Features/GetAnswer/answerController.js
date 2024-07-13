import { getAnswerForQuestion } from "../../Services";
import AnswerModel from "./AnswerModel";

export const getAnswer = async (questionId) => {
  try {
    let response = await getAnswerForQuestion(questionId);

    if (response) {
      let answersArray = [];

      if (typeof response === 'string') {
        // Handle concatenated JSON objects in a string
        const jsonStrings = response.match(/({.*?})(?={|$)/g);
        answersArray = jsonStrings.map(jsonString => new AnswerModel(JSON.parse(jsonString)));
      } else if (Array.isArray(response)) {
        const newResponse = response.map(resObj => resObj["0"])
        // Handle array of objects
        answersArray = newResponse.map(answerObj => new AnswerModel(answerObj));
      } else if (typeof response === 'object') {
        // Handle single object
        answersArray = [new AnswerModel(response)];
      }
      else if (Array.isArray(response)) { 
        // Handle array of objects
        answersArray = response.map(answerObj => new AnswerModel(answerObj));
      }
      else {
        throw new Error("Invalid response format");
      }

      return answersArray;
    } else {
      throw new Error("Invalid response !!");
    }
  } catch (error) {
    console.error(error);
  }
};
