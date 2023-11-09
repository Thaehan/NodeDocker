import express from "express";

import routerV1 from "./v1/index.js";

const router = express.Router();

//log all request
router.use((req, res, next) => {
  console.log(
    `${req.method} | ${req.originalUrl} | ${new Date().toLocaleString()} | ${
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip
    } `
  );
  console.log("Body: ", req.body);

  next();
});

router.use("/api/v1", routerV1);

router.get("*", (req, res) => {
  res.status(404).send({
    message: "API not found",
    code: 404,
  });
});

router.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.json({ code: "system_error", message: err.message });
});

export default router;
