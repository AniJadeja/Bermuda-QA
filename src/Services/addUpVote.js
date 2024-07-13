import bermudaAPI from "./api";

export const addUpVoteForAnswer = async (userId, answerId, totalUpvotes) => {
  const url = `?type=giveupvote&user=${userId}&ansid=${answerId}&totalupvotes=${totalUpvotes}`;
  const response = await bermudaAPI.post(`${url}`);
  return response?.data;
};