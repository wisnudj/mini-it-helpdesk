'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Employee;
};