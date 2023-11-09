import express from "express";

import mongoRoutes from "./mongo.routes.js";
import postgreRoutes from "./postgre.routes.js";

const router = express.Router();

router.use("/mongo", mongoRoutes);
router.use("/postgre", postgreRoutes);

export default router;
