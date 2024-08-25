/** @format */

module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      price: DataTypes.DECIMAL(10, 2),
    },
    {
      underscored: true,
    }
  )

  Room.associate = (db) => {
    Room.hasMany(db.Booking, {
      foreignKey: {
        name: "roomId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })

    Room.belongsTo(db.Province, {
      foreignKey: {
        name: "provinceId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })

    Room.belongsTo(db.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })
  }

  return Room
}
