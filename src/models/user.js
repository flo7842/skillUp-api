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
      yearsold: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 120,
          },
      },
      phone_number: {
        type: DataTypes.STRING
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
      street_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dt_inscription: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      role: {
        type: DataTypes.ENUM(['user', 'admin'])
      },
    },
     {
      timestamps: true,
      createdAt: false,
      updatedAt: false
    })
    return User;
  }
  