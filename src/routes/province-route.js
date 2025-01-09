/** @format */
const express = require("express");
const provinceController = require("../controllers/province-controller");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/create",
  upload.fields([
    {
      name: "image",
      maxCount: 6,
    },
  ]),
  provinceController.createProvince
);

router.get("/", provinceController.getProvice);

module.exports = router;
