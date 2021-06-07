

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
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le pseudo est déjà pris, réesayez avec un autre pseudo"
        }
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: true
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'"
      },
      birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
         get: function() {
           return moment.utc(this.getDataValue('regDate')).format('DD-MM-YYYY');
         },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      street_number: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      batiment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
     {
      timestamps: true,
      createdAt: true,
      updatedAt: true
    })

    
    
    return User;
  }
  