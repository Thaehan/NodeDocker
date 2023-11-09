import Database from "../model/index.js";

export const selectAllPost = async () => {
  const result = await Database.Post.findAll();

  console.log(result);
};

export const createPost = async (post) => {
  const result = await Database.Post.create(post);

  console.log("result", result);
};
