const { Command, User, Command_line, Course } = require('../../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/command-line/:id', auth, (req, res) => {
    Command_line.findAll({
        where: {
            CommandId: req.params.id
          }, include: Course}
        )
        .then(command => {
          const message = 'Les lignes de commandes de l\'utilisateur ont bien été récupérées.'
          res.json({ message, data: command })
        })
        .catch(error => {
          const message = 'Les lignes de commandes n\'ont pas pu être récupérées. Réessayez dans quelques instants.'
          res.status(500).json({ message, data: error })
        })
  })
}