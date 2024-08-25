/** @format */
const express = require("express")
const bookingController = require("../controllers/bookings-controller")
const authenticateMiddleware = require("../middlewares/authenticate")

const router = express.Router()

router.post(
  "/:roomId",
  authenticateMiddleware,
  bookingController.createBooking
),
  router.get("/getBooging", bookingController.getBooking)

module.exports = router
