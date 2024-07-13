import bermudaAPI from "./api";

export const getMyVoteForAnswer = async (userId, answerId) => {
  const url = `?type=fetchmyvote&user=${userId}&ansid=${answerId}`;
  const response = await bermudaAPI.get(`${url}`);
  //dummy response
//  return  {"id":"6","date":"0000-00-00"}
  return response?.data;
};