/** @format */
const {NOTYETPAID, PAYMENTMADE} = require("../config/constant")

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      startDate: {type: DataTypes.DATE, allowNull: false},
      endDate: {type: DataTypes.DATE, allowNull: false},
      price: DataTypes.DECIMAL(10, 2),
      totalNotIncludingTax: DataTypes.DECIMAL(10, 2),
      status: {
        type: DataTypes.ENUM(NOTYETPAID, PAYMENTMADE),
        allowNull: false,
        defaultValue: NOTYETPAID,
      },
    },
    {
      underscored: true,
    }
  )

  Booking.associate = (db) => {
    Booking.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })

    Booking.belongsTo(db.Province, {
      foreignKey: {
        name: "provinceId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })

    Booking.belongsTo(db.Room, {
      foreignKey: {
        name: "roomId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })
  }

  return Booking
}
