'use strict';
const bcrypt = require('bcrypt');

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
  // Teknisi.beforeCreate((teknisi, options) => {
  //   const saltRounds = 10;
  //   const myPlaintextPassword = teknisi.password;
  //   return  bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
  //     teknisi.password = hash
  //   });
  // });

  Teknisi.associate = function(models) {
    Teknisi.belongsToMany(models.Admin, {through: 'Tiket'})
    Teknisi.belongsToMany(models.Employee, {through: 'Tiket'})
    Teknisi.hasMany(models.Tiket)
  }

  return Teknisi;
};
