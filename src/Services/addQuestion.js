import bermudaAPI from "./api";

export const addQuestionService = async (question, userId, asker, date) => {
  const url = `?type=addquestion&que=${encodeURIComponent(question)}&user=${userId}&asker=${asker}&date=${date}`;
  const response = await bermudaAPI.post(`${url}`);
  return response?.data;
};