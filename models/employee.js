'use strict';
module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Employee.associate = function(models) {
    Employee.belongsToMany(models.Admin, {through: 'Tiket'})
    Employee.belongsToMany(models.Teknisi, {through: 'Tiket'})
    Employee.hasMany(models.Tiket)
  }

  return Employee;
};
