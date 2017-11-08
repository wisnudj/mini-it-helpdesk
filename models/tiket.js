'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tiket = sequelize.define('Tiket', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    EmployeeId: DataTypes.INTEGER,
    TeknisiId: DataTypes.INTEGER,
    AdminId: DataTypes.INTEGER,
    Problem: DataTypes.STRING,
    Feedback: DataTypes.STRING,
    Status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Tiket.associate = function(models) {
    Tiket.belongsTo(models.Employee)
    Tiket.belongsTo(models.Teknisi)
    Tiket.belongsTo(models.Admin)
  }

  return Tiket;
};
