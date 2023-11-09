import express from "express";

import { createMongo, getAllMongo } from "../../controller/mongo.controller.js";

const router = express.Router();

router.get("/", getAllMongo);

export default router;
