module.exports = (sequelize, DataTypes) => {

    const Company = sequelize.define('Company', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom de cette company est déjà pris."
        }
      },
      street_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sociale: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      siret: {
        type: DataTypes.STRING,
        allowNull: false,
      }
      },
     {
      timestamps: true,
      createdAt: false,
      updatedAt: false
    })
    return Company;
  }
  