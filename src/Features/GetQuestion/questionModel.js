import { QuestionError } from "./questionError";
class QuestionModel {
  constructor(questionModel) {
    this.id = this.validateAndConvertId(questionModel.id);
    this.user = this.validateUserEmail(questionModel.user);
    this.asker = this.validateAsker(questionModel.asker);
    this.question = this.validateQuestion(questionModel.question);
    this.date = this.validateDate(questionModel.date);
  }

  validateAndConvertId(id) {
    const intId = parseInt(id, 10);
    if (isNaN(intId)) {
      throw new Error(QuestionError.invalidIdError);
    }
    return intId;
  }

  validateUserEmail(user) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof user !== "string" || !emailPattern.test(user)) {
      
      throw new Error(QuestionError.invalidUserError);
    }
    return user;
  }

  validateAsker(value) {
    if (typeof value !== "string") {
      throw new Error(QuestionError.invalidAskerError);
    }
    return value;
  }

  validateQuestion(question) {
    if (typeof question !== "string") {
      throw new Error(QuestionError.invalidQuestionError);
    }
    if (!question.endsWith("?")) {
      question += "?";
    }
    return question;
  }

  validateDate(date) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const today = new Date();
    const inputDate = new Date(date);

    if (!datePattern.test(date)) {
      throw new Error(QuestionError.invalidDateError.formatError);
    }
    if (inputDate >= today) {
      throw new Error(QuestionError.invalidDateError.dateError);
    }
    return date;
  }
}


export default QuestionModel;
