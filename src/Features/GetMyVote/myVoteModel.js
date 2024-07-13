import { MyVoteError } from './myVoteError';

class MyVoteModel {
  constructor(myVoteModel) {
    this.id = this.validateId(myVoteModel.id);
    this.date = this.validateDate(myVoteModel.date);
  }

  validateId(id) {
    const intId = parseInt(id, 10);
    if (isNaN(intId) || intId <= 0) {
      throw new Error(MyVoteError.invalidIdError);
    }
    return intId;
  }

  validateDate(date) {
    if (date === "0000-00-00") {
      return null; // Treat "0000-00-00" as no date
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const today = new Date();
    const inputDate = new Date(date);

    if (!datePattern.test(date)) {
      throw new Error(MyVoteError.invalidDateError.formatError);
    }
    if (inputDate > today) {
      throw new Error(MyVoteError.invalidDateError.dateError);
    }
    return date;
  }
}

export default MyVoteModel;