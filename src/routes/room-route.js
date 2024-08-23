/** @format */
const express = require("express")
const roomController = require("../controllers/room-controller")
const upload = require("../middlewares/upload")

const router = express.Router()

router.post(
  "/",
  upload.fields([
    {
      name: "image",
      maxCount: 6,
    },
  ]),
  roomController.createRoom
)

router.get("/getRoom", roomController.getRoom)

module.exports = router
