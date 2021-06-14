module.exports = (sequelize, DataTypes) => {

    const Invoice = sequelize.define('Invoice', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
     {
      timestamps: true,
      createdAt: true,
      updatedAt: false
    })
    return Invoice;
  }
  