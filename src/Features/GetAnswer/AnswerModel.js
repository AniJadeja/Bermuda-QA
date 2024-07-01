class AnswerModel {
  constructor(answerModel) {
    this.id = this.validateId(answerModel.id);
    this.pname = this.validatePname(answerModel.pname);
    this.user = this.validateUser(answerModel.user);
    this.answer = this.validateAnswer(answerModel.answer);
    this.date = this.validateDate(answerModel.date);
    this.upvote = this.validateUpvote(answerModel.upvote);
  }

  validateId(id) {
    const intId = parseInt(id, 10);
    if (isNaN(intId) || intId < 0) {
      throw new Error(AnswerError.invalidIdError);
    }
    return intId;
  }

  validatePname(pname) {
    if (typeof pname !== "string" || pname.trim() === "") {
      throw new Error(AnswerError.invalidPnameError);
    }
    return pname;
  }

  validateUser(user) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof user !== "string" || !emailPattern.test(user)) {
      throw new Error(AnswerError.invalidUserError);
    }
    return user;
  }

  validateAnswer(answer) {
    if (typeof answer !== "string" || answer.trim() === "") {
      throw new Error(AnswerError.invalidAnswerError);
    }
    return answer;
  }

  validateDate(date) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const today = new Date();
    const inputDate = new Date(date);

    if (!datePattern.test(date)) {
      throw new Error(AnswerError.invalidDateError.formatError);
    }
    if (inputDate >= today) {
      throw new Error(AnswerError.invalidDateError.dateError);
    }
    return date;
  }

  validateUpvote(upvote) {
    const intUpvote = parseInt(upvote, 10);
    if (isNaN(intUpvote) || intUpvote < 0) {
      throw new Error(AnswerError.invalidUpvoteError);
    }
    return intUpvote;
  }
}

export default AnswerModel;
