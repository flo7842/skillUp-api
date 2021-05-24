const { Command } = require('../../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/commands', auth, (req, res) => {
    Command.findAll({
      include:[
               {
                   model: User, 
                   
               }] })
        .then(command => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: command })
        })
        .catch(error => {
          const message = 'La liste des pokémons n\'a pas pu être récupérée. Réessayez dans quelques instants.'
          res.status(500).json({ message, data: error })
        })
  })
}