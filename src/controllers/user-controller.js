/** @format */
const fs = require("fs")
const cloudinary = require("../utils/cloudinary")
const createError = require("../utils/create-error")
const {User} = require("../models")

exports.updateProfileImage = async (req, res, next) => {
  try {
    let value

    const profilePublicId = req.user.profileImage
      ? cloudinary.getPublicId(req.user.profileImage)
      : null

    if (!req.file) {
      createError("profile image is required")
    }

    if (req.file) {
      const profileImage = await cloudinary.uploadProfile(
        req.file.path,
        profilePublicId
      )

      value = {profileImage}
    }

    await User.update(value, {where: {id: req.user.id}})

    res.status(200).json(value)
  } catch (err) {
    next(err)
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path)
    }
  }
}
