export const getQuestionFromURL = () => {
  const path = window.location.pathname;
  const query = new URLSearchParams(window.location.search);
  
  // Check for the query parameter 'que'
  if (query.has('que')) {
    const question = decodeURIComponent(query.get('que')).replace(/-/g, " ");
    return question;
  }

  // Remove the leading slash and decode the URL
  const isQAUrl = checkIfQAUrl(path);
  let question;
  if (isQAUrl) question = decodeURIComponent(path.slice(4));
  else question = decodeURIComponent(path.slice(1));

  // Replace hyphens with spaces
  return question.replace(/-/g, " ");
};

const checkIfQAUrl = (url) => {
  url = url.split("/");
  if (url[1] === "QA") return true;
  return false;
};

export const updateURLWithQuestion = (question) => {
  // Replace spaces with hyphens and encode the question
  const encodedQuestion = encodeURIComponent(question.replace(/ /g, "-"));
  const newUrl = `/${encodedQuestion}`;
  window.history.pushState({}, "", newUrl);
};
