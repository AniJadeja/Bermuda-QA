import { AddAnswerError } from './addAnswerError';

class AddAnswerModel {
  constructor(addAnswerModel) {
    this.status = this.validateStatus(addAnswerModel.status);
    this.desc = this.validateDesc(addAnswerModel.desc);
  }

  validateStatus(status) {
    if (status !== "200" && status !== "0") {
      throw new Error(AddAnswerError.invalidStatusError);
    }
    return status;
  }

  validateDesc(desc) {
    if (typeof desc !== "string" || desc.trim() === "") {
      throw new Error(AddAnswerError.invalidDescError);
    }
    return desc;
  }
}

export default AddAnswerModel;