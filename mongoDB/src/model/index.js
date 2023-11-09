import mongoose from "mongoose";

import postModel from "./post.model.js";

export const Post = postModel(mongoose);

export default {
  Post,
};
