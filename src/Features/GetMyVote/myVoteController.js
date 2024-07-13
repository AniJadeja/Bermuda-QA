import { getMyVoteForAnswer } from "../../Services";
import MyVoteModel from "./myVoteModel";

export const getMyVote = async (userId, answerId) => {
    try {
        let response = await getMyVoteForAnswer(userId, answerId);
        if (!response) { 
            return null; // No vote found
        }
        if (response) {

            return new MyVoteModel(response);
        } else {
            throw new Error("Invalid response !!");
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};