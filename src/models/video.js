module.exports = (sequelize, DataTypes) => {

    const Video = sequelize.define('Video', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
     {
      timestamps: true,
      createdAt: false,
      updatedAt: false
    })
    return Video;
  }
  