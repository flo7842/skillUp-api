module.exports = (sequelize, DataTypes) => {

    const Invoice = sequelize.define('Invoice', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      invoice_date: {
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
  