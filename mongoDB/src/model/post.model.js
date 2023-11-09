import { InferSchemaType, Mongoose, Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true, min: 4, max: 16 },
    description: { type: String, required: true, min: 6 },
  },
  {
    timestamps: true,
  }
);

const postModel = (mongoose) => {
  postSchema.method("toJSON", function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    delete object.__v;
    return object;
  });

  const Post = mongoose.model("post", postSchema);
  return Post;
};

export default postModel;
