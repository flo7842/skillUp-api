module.exports = (sequelize, DataTypes) => {

    const Role = sequelize.define('Role', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
      },
    },
     {
      timestamps: true,
      createdAt: false,
      updatedAt: false
    })
    return Role;
  }
  