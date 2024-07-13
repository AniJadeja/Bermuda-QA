import { AddQuestionError } from './addQuestionError';

class AddQuestionModel {
  constructor(addQuestionModel) {
    this.status = this.validateStatus(addQuestionModel.status);
    this.desc = this.validateDesc(addQuestionModel.desc);
  }

  validateStatus(status) {
    if (status !== "200" && status !== "0") {
      throw new Error(AddQuestionError.invalidStatusError);
    }
    return status;
  }

  validateDesc(desc) {
    if (typeof desc !== "string" || desc.trim() === "") {
      throw new Error(AddQuestionError.invalidDescError);
    }
    return desc;
  }
}

export default AddQuestionModel;