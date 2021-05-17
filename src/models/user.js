

const moment= require('moment') 

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "L'adresse email ou le mot de passe sont déjà pris."
        }
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
        min:{
            args:[4],
            msg:"Le mot de passe ne peut pas être inférieur à 4 caractères"
       }
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      avatar: {
        type: DataTypes.STRING
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
         get: function() {
           return moment.utc(this.getDataValue('regDate')).format('DD-MM-YYYY');
         },
      },
      phone_number: {
        type: DataTypes.STRING
      },
      street_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      street_number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      batiment: {
        type: DataTypes.STRING
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
     {
      timestamps: true,
      createdAt: true,
      updatedAt: true
    })

    
    
    return User;
  }
  