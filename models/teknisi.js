'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teknisi = sequelize.define('Teknisi', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Teknisi;
};