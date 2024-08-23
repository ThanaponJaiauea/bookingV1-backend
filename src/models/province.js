/** @format */

module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define(
    "Province",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      underscored: true,
    }
  )

  Province.associate = (db) => {
    Province.hasMany(db.Booking, {
      foreignKey: {
        name: "provinceId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })

    Province.hasMany(db.Room, {
      foreignKey: {
        name: "provinceId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    })
  }

  return Province
}
