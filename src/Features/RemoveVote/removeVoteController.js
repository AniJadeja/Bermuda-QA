import { removeVoteForAnswer } from "../../Services";
import RemoveVoteModel from "./RemoveVoteModel.js";
import { getMyVoteForAnswer } from "../../Services";

export const removeVote = async (userId, answerId, totalUpvotes) => {
  try {

    let responseMyVote = await getMyVoteForAnswer(userId, answerId);

    if(responseMyVote == 0)
    {
      throw new Error ("User has not voted. So user cannot devote")
    }


    if(!responseMyVote){
        throw new Error("Invalid response for my vote")
    }

    let upvoteId = responseMyVote.id;

    let response = await removeVoteForAnswer(userId, answerId, totalUpvotes, upvoteId);

    if (response) {
      return new RemoveVoteModel(response);
    } else {
      throw new Error("Invalid response !!");
    }
  } catch (error) {
    console.error(error);
    return new RemoveVoteModel({ status: "0", desc: error.message });
  }
};