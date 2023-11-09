import { sequelize } from "../configs/index.js";

export const createTable = async () => {
  try {
    const result = await sequelize.query(`CREATE TABLE IF NOT EXISTS post(
        title "char" NOT NULL,
        description text
    )`);

    console.log("result", result);
  } catch (error) {
    console.error(error);
  }
};

export const selectAllPost = async () => {
  const result = await sequelize.query(`SELECT * FROM post`);

  console.log("result", result);
  return result[0];
};

export const createPost = async (post) => {
  const result = await sequelize.query(`INSERT INTO post(title, description)
    VALUES (${post.title}, ${post.description});`);
  console.log("result", result);
};
