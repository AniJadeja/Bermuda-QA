import { addUpVoteForAnswer } from "../../Services";
import { getMyVote } from "../GetMyVote/myVoteController";
import UpvoteModel from "./UpvoteModel";

export const addUpVote = async (userId, answerId, totalUpvotes) => {
  try {
    let myVoteResponse = await getMyVote(userId, answerId);
    if (myVoteResponse) {
      return null;
    } else if (myVoteResponse == "0") {
      return -1;
    }

    let response = await addUpVoteForAnswer(userId, answerId, totalUpvotes);
    console.log("Upvote Response : ", response);
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
