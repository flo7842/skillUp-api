

module.exports = (sequelize, DataTypes) => {

    const USER_ROLE = sequelize.define('USER_ROLE', {
        
    },
     {
      timestamps: true,
      createdAt: false,
      updatedAt: false
    })

    return USER_ROLE;
  }
  