const { Command, User } = require('../../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/commands/:id', auth, (req, res) => {
    Command.findAll({
        where: {
            UserId: req.params.id
          },
          include: User
        })
        .then(user => {
          const message = 'La liste des commandes de l\'utilisateur a bien été récupérée.'
          res.json({ message, data: user })
        })
        .catch(error => {
          const message = 'La liste des commandes de l\'utilisateur n\'a pas pu être récupérée. Réessayez dans quelques instants.'
          res.status(500).json({ message, data: error })
        })
  })
}