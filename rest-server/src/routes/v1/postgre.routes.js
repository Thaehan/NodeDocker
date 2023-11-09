import express from "express";

import { createPostgre, getAllPostgre } from "../../controller/postgre.controller.js";

const router = express.Router();

router.get("/", getAllPostgre);

export default router;
