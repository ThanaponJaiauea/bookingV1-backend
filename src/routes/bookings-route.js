/** @format */
const express = require("express")
const bookingController = require("../controllers/bookings-controller")

const router = express.Router()

router.post("/:roomId", bookingController.createBooking),
  router.get("/getBooging", bookingController.getBooking)

module.exports = router
