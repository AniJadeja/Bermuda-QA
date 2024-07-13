import bermudaAPI from "./api";

export const addAnswerService = async (questionId, answer, userId, answerer, date, upvote) => {
  const url = `?type=addanswer&questionId=${questionId}&answer=${encodeURIComponent(answer)}&user=${userId}&answerer=${answerer}&date=${date}&upvote=${upvote}`;
  const response = await bermudaAPI.post(`${url}`);
  return response?.data;
};