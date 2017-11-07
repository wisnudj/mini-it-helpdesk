'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tiket = sequelize.define('Tiket', {
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
  return Tiket;
};