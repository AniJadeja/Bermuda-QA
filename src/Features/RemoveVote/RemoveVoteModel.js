import { RemoveVoteError } from './removeVoteErrors';

class RemoveVoteModel {
  constructor(removeVoteModel) {
    this.status = this.validateStatus(removeVoteModel.status);
    this.desc = this.validateDesc(removeVoteModel.desc);
  }

  validateStatus(status) {
    if (status !== "200" && status !== "0") {
      throw new Error(RemoveVoteError.invalidStatusError);
    }
    return status;
  }

  validateDesc(desc) {
    if (typeof desc !== "string" || desc.trim() === "") {
      throw new Error(RemoveVoteError.invalidDescError);
    }
    return desc;
  }
}

export default RemoveVoteModel;