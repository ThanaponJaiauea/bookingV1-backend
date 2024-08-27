/** @format */
const express = require("express")
const roomController = require("../controllers/room-controller")
const upload = require("../middlewares/upload")
const authenticateMiddleware = require("../middlewares/authenticate")

const router = express.Router()

router.post(
  "/",
  upload.fields([{name: "image", maxCount: 10}]),
  authenticateMiddleware,
  roomController.createRoom
)

router.get("/getRoom", roomController.getRoom)

module.exports = router
