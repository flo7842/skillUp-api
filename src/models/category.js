module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define('Category', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom de cette catégorie est déjà pris."
      }
      },
    },
     {
      timestamps: true,
      createdAt: false,
      updatedAt: false
    })
    return Category;
  }
  