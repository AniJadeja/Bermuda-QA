import bermudaAPI from "./api";

export const removeVoteForAnswer = async (userId, answerId, totalUpvotes, upvoteId) => {
  const url = `?type=removeupvote&user=${userId}&ansid=${answerId}&totalupvotes=${totalUpvotes}&upvoteid=${upvoteId}`;
  const response = await bermudaAPI.post(`${url}`);
  return response?.data;
};