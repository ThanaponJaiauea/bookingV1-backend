/** @format */
const {Booking, Room} = require("../models")

exports.createBooking = async (req, res, next) => {
  try {
    const data = req.body
    const {roomId} = req.params

    // console.log("roomId:", roomId)
    // console.log("data:", data)

    const value = {
      userId: data[0].userId,
      roomId: +roomId,
      provinceId: data[0].provinceId,
      startDate: data[0].startDate,
      endDate: data[0].endDate,
      price: data[0].price,
      totalNotIncludingTax: data[0].totalNotIncludingTax,
      status: data[0].status,
    }

    console.log("value:", value)

    await Booking.create(value)

    res.status(200).json({message: "Create Booking Successfully "})
  } catch (err) {
    next(err)
  }
}

exports.getBooking = async (req, res, next) => {
  try {
    const getBooking = await Booking.findAll({})
    res.status(201).json(getBooking)
  } catch (err) {
    next(err)
  }
}
