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
    // console.log("data:", data)

    const convertDateToISO = (dateStr) => {
      const [day, month, year] = dateStr.split("/")
      return new Date(`${year}-${month}-${day}`).toISOString()
    }

    const startDate = convertDateToISO(data[0].startDate)
    const endDate = convertDateToISO(data[0].endDate)

    const existingBooking = await Booking.findOne({
      where: {
        roomId: +roomId,
        startDate: {
          [Op.lte]: endDate,
        },
        endDate: {
          [Op.gte]: startDate,
        },
      },
    })

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
