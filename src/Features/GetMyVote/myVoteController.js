import { getMyVoteForAnswer } from "../../Services";
import MyVoteModel from "./myVoteModel";

export const getMyVote = async (userId, answerId) => {
  try {
    let response = await getMyVoteForAnswer(userId, answerId);

    console.log("getMyVoteResponse : ", response)


    if (!response) {
      return null; // No vote found
    }
    if (response) {
      let voteArray = [];

      if (typeof response === "string") {
        // Handle concatenated JSON objects in a string
        const jsonStrings = response.match(/({.*?})(?={|$)/g);
        voteArray = jsonStrings.map(
          (jsonString) => new MyVoteModel(JSON.parse(jsonString))
        );
        console.log("Vote found : ", voteArray)
      } else if (Array.isArray(response)) {
        const newResponse = response.map((resObj) => resObj["0"]);
        // Handle array of objects
        voteArray = newResponse.map(
          (voteObj) => new MyVoteModel(voteObj)
        );
      } else if (typeof response === "object") {
        // Handle single object
        voteArray = [new MyVoteModel(response)];
      } else if (Array.isArray(response)) {
        // Handle array of objects
        voteArray = response.map((voteObj) => new MyVoteModel(voteObj));
      } else {
        throw new Error("Invalid response format");
      }
      return new MyVoteModel(response);
    } else {
      throw new Error("Invalid response !!");
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
