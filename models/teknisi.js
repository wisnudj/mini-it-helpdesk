'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var Teknisi = sequelize.define('Teknisi', {
    name: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      validate: {
        isUnique: function(value, callback) {
          // console.log(value);
          Teknisi.find({
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
          Teknisi.find({
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
  Teknisi.beforeCreate((teknisi, options) => {
    const saltRounds = 10;
    const myPlaintextPassword = teknisi.password;
    return  bcrypt.hash(myPlaintextPassword, saltRounds).then(function(hash) {
      teknisi.password = hash
    });
  });

  Teknisi.associate = function(models) {
    Teknisi.belongsToMany(models.Admin, {through: 'Tiket'})
    Teknisi.belongsToMany(models.Employee, {through: 'Tiket'})
    Teknisi.hasMany(models.Tiket)
  }

  return Teknisi;
};
