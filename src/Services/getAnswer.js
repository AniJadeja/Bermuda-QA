import bermudaAPI from "./api";

export const getAnswerForQuestion = async (questionId) => {
  const url = `?type=fetchanswers&questionId=${questionId}`;
  const response = await bermudaAPI.get(`${url}`);
  return response?.data;
};
