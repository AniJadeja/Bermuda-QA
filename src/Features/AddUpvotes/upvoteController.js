import { addUpVoteForAnswer } from "../../Services";
import UpvoteModel from "./UpvoteModel";

export const addUpVote = async (userId, answerId, totalUpvotes) => {
  try {
    let response = await addUpVoteForAnswer(userId, answerId, totalUpvotes);
    console.log("Upvote Response : ", response)
    if (response) {
      return new UpvoteModel(response);
    } else {
      throw new Error("Invalid response !!");
    }
  } catch (error) {
    console.error(error);
    return new UpvoteModel({ status: "0", desc: error.message });
  }
};