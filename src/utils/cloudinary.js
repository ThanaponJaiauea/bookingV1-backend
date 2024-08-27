/** @format */

const cloudinary = require("../config/cloudinary")

exports.uploadProfile = async (filePath, publicId) => {
  console.log("publicId:", publicId)

  const option = {
    unique_filename: false,
    use_filename: true,
    overwrite: true,
    folder: "/bookingV2/profileUser",
  }

  if (publicId) {
    option.public_id = publicId
  }

  const result = await cloudinary.uploader.upload(filePath, option)
  //   console.log(result, "result");
  return result.secure_url
}

exports.getPublicId = (url) => {
  const splitSlash = url.split("/")
  return splitSlash[splitSlash.length - 1].split(".")[0]
}
