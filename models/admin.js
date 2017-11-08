'use strict';
module.exports = (sequelize, DataTypes) => {
  var Admin = sequelize.define('Admin', {
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
  //    Pasien.belongsToMany(model.Dokter, {through: 'Periksa'})
    // Pasien.belongsToMany(model.Diagnosis, {through: 'Periksa'})
  Admin.associate = function(models) {
    Admin.belongsToMany(models.Employee, {through: 'Tiket'})
    Admin.belongsToMany(models.Teknisi, {through: 'Tiket'})
    Admin.hasMany(models.Tiket)
  }

  return Admin;
};
