

module.exports = (sequelize, DataTypes) => {

    const Command = sequelize.define('Command', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          taxe: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
    },
     {
      timestamps: true,
      createdAt: false,
      updatedAt: false
    })

    return Command;
  }
  