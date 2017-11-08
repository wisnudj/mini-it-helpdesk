'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function(value, callback) {
          console.log(value);
          Employee.find({
            where: {username: value}
          }).then((result) =>{
            if(result && this.id != result.id) {
              callback('Username sudah terpakai', value)
            }
            else {
              callback()
            }
          })
        }
      }
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'The email you entered is invalid'
        },
        isUnique: function(value, callback) {
          console.log(value);
          Employee.find({
            where: {email: value}
          }).then((result) =>{
            if(result && this.id != result.id) {
              callback('Email sudah terpakai', value)
            }
            else {
              callback()
            }
          })
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Employee.beforeCreate((employee, options) => {
    const saltRounds = 10;
    const myPlaintextPassword = employee.password;
    return  bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
      employee.password = hash
    });
  });

  Employee.associate = function(models) {
    Employee.belongsToMany(models.Admin, {through: 'Tiket'})
    Employee.belongsToMany(models.Teknisi, {through: 'Tiket'})
    Employee.hasMany(models.Tiket)
  }

  return Employee;
};


