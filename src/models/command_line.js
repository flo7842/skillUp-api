module.exports = (sequelize, DataTypes) => {

    const Command_line = sequelize.define('Command_line', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      },
     {
      timestamps: true,
      createdAt: false,
      updatedAt: false
    })
    
    return Command_line;
  }
  