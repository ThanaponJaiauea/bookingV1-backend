/** @format */

const {User} = require("../models");
const createError = require("../utils/create-error");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const value = req.body;

    const user = await User.findOne({
      where: {email: value.email},
    });

    if (user) {
      createError("invalid email or password", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);

    res
      .status(201)
      .json({message: "register success. please log in to continue."});
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = req.body;

    const user = await User.findOne({
      where: {email: value.email},
    });

    if (!user) {
      createError("invalid email or password", 400);
    }

    const isCorrect = await bcrypt.compare(value.password, user.password);

    if (!isCorrect) {
      createError("invalid email or password", 400);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        profileImage: user.profileImage,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET_KEY,

      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({accessToken});
  } catch (err) {
    next(err);
  }
};
