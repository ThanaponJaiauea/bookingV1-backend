/** @format */
const {Booking} = require("../models")
const {Op} = require("sequelize")

exports.createBooking = async (req, res, next) => {
  try {
    const data = req.body
    const {roomId} = req.params
    const userId = req.user.id

    // console.log("userId:", userId)
    // console.log("roomId:", roomId)
    console.log("data:", data)

    const convertDateToISO = (dateStr) => {
      return new Date(dateStr).toISOString()
    }

    const startDate = convertDateToISO(data[0].startDate)
    const endDate = convertDateToISO(data[0].endDate)

    // console.log("startDate:", startDate)
    // console.log("endDate:", endDate)

    const existingBooking = await Booking.findOne({
      where: {
        roomId: +roomId,
        startDate: {
          // [Op.lt]: endDate,
          [Op.lte]: endDate,
        },
        endDate: {
          // [Op.gt]: startDate,
          [Op.gte]: startDate,
        },
      },
    })

    // console.log("existingBooking:", existingBooking)

    if (existingBooking) {
      return res
        .status(400)
        .json({message: "Room is already booked for the selected dates."})
    }

    const value = {
      userId: userId,
      roomId: +roomId,
      provinceId: data[0].provinceId,
      startDate: startDate,
      endDate: endDate,
      price: data[0].price,
      totalNotIncludingTax: data[0].totalNotIncludingTax,
      status: data[0].status,
    }

    // console.log("value:", value)

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
