'use strict';
module.exports = (sequelize, DataTypes) => {
  var Teknisi = sequelize.define('Teknisi', {
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

  Teknisi.associate = function(models) {
    Teknisi.belongsToMany(models.Admin, {through: 'Tiket'})
    Teknisi.belongsToMany(models.Employee, {through: 'Tiket'})
    Teknisi.hasMany(models.Tiket)
  }

  return Teknisi;
};
