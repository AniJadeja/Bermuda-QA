import { UpvoteError } from './upvoteError';

class UpvoteModel {
  constructor(upvoteModel) {
    this.status = this.validateStatus(upvoteModel.status);
    this.desc = this.validateDesc(upvoteModel.desc);
  }

  validateStatus(status) {
    if (status !== "200" && status !== "0") {
      throw new Error(UpvoteError.invalidStatusError);
    }
    return status;
  }

  validateDesc(desc) {
    if (typeof desc !== "string" || desc.trim() === "") {
      throw new Error(UpvoteError.invalidDescError);
    }
    return desc;
  }
}

export default UpvoteModel;