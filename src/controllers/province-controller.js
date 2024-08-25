/** @format */

const {Province} = require("../models")

exports.createProvince = async (req, res, next) => {
  try {
    const {nameDataArray} = req.body
    console.log("nameDataArray:", nameDataArray)

    const provinces = nameDataArray.map((el) => el.name)
    // console.log("provinces:", provinces)

    for (let i = 0; i < provinces.length; i++) {
      const value = {
        name: provinces[i],
      }
      //   console.log("value:", value)

      await Province.create(value)
    }
    res.status(200).json({message: "Create Province Successfully "})
  } catch (err) {
    next(err)
  }
}

exports.getProvice = async (req, res, next) => {
  try {
    const data = await Province.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    })

    return res.status(200).json(data)
  } catch (err) {
    next(err)
  }
}
