const { Sequelize, DataTypes } = require('sequelize')
const UserModel = require('../models/user')


const bcrypt = require('bcrypt')
  
const sequelize = new Sequelize('skillUp', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

const User = UserModel(sequelize, DataTypes)


  
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {
    
    
    console.log('La base de donnée a bien été initialisée !')
  })
}
  
module.exports = { 
  initDb, User

}