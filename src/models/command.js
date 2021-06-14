
const moment= require('moment') 

module.exports = (sequelize, DataTypes) => {

    const Command = sequelize.define('Command', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
    },
     {
      timestamps: true,
      createdAt: true,
      updatedAt: false
    })

    return Command;
  }
  