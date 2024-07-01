import bermudaAPI from "./api";

export const getQuestionAndData = async (question) => {
  const url = `?type=fetchquestion&que=${question}`;
  const response = await bermudaAPI.get(`${url}`);
  return response?.data;
};
