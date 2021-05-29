const { Command } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/command/:id', auth, (req, res) => {
    Command.findByPk(req.params.id).then(command => {
      if(command === null){
        const message = `La commande demandé n'existe pas. Réesayez avec un autre identifiant`;
        return res.status(404).json({message})
      }
      const commandDeleted = command;
      return Command.destroy({
        where: { id: command.id }
      })
      .then(_ => {
        const message = `La commande ${commandDeleted.id} a bien été supprimée.`
        res.json({message, data: commandDeleted })
      })
      .catch(error => {
        const message = 'La commande n\'a pas pu être supprimé. Réesayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
  })
}