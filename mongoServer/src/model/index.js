import mongoose from "mongoose";

import postModel from "./post.model";

export const Post = postModel(mongoose);

export default {
  Post,
};
