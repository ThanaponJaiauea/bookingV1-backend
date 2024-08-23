/** @format */

const {Room} = require("../models")

exports.createRoom = async (req, res, next) => {
  try {
    const {provinceId, name, description, address, price} = req.body

    if (!req.files || !req.files.image || req.files.image.length === 0) {
      return res.status(400).json({message: "Room image is required"})
    }

    const roomImages = []

    for (let i = 0; i < req.files.image.length; i++) {
      const roomImage = req.files.image[i].path
      roomImages.push(roomImage)
    }

    const value = {
      provinceId: +provinceId,
      name: name,
      description: description,
      address: address,
      price: +price,
      image: JSON.stringify(roomImages),
    }

    console.log("value", value)

    await Room.create(value)

    res.status(200).json({message: "Create Room Successfully"})
  } catch (err) {
    next(err)
  }
}

exports.getRoom = async (req, res, next) => {
  try {
    const data = await Room.findAll({})
    res.status(200).json(data)
  } catch (err) {
    next(err)
  }
}
