const { Command } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/command/:id', auth, (req, res) => {
    Command.findByPk(req.params.id)
      .then(command => {

        const message = 'La commande a bien été trouvé.'
        res.json({ message, data: command })
      })
  })
}