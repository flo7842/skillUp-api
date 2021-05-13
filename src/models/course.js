module.exports = (sequelize, DataTypes) => {

    const Course = sequelize.define('Course', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rate: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tax: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      datePublish: {
        type: DataTypes.STRING
      },

    },
     {
      timestamps: true,
      createdAt: false,
      updatedAt: false
    })
    return Course;
  }
  