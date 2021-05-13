module.exports = (sequelize, DataTypes) => {

    const Invoice = sequelize.define('Invoice', {
      invoiceNum: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      invoiceDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
     {
      timestamps: true,
      createdAt: false,
      updatedAt: false
    })
    return Invoice;
  }
  