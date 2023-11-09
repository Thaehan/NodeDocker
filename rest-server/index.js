import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import router from "./src/routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8081"],
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log("listening on port ", port);
});
