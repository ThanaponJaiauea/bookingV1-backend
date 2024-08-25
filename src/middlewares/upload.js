/** @format */

const multer = require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "public/images");

    // console.log("file:", file);
    if (file.fieldname === "document") {
      cb(null, "public/documents")
    } // console.log(file, "filemulter");
    else {
      cb(null, "public/images")
    }
  },
  filename: (req, file, cd) => {
    // console.log(req, "req");
    // console.log(file, "file");

    cd(
      null,
      new Date().getTime() +
        "" +
        Math.round(Math.random() * 1000000000) +
        "." +
        file.mimetype.split("/")[1]
    )
  },
})

module.exports = multer({storage})
