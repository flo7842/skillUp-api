const { Command } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.put('/api/command/:id', auth, (req, res) => {
    const id = req.params.id
    Command.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Command.findByPk(id).then(command => {
        if(command === null){
          const message = `La commande demandé n'existe pas. Réesayez avec un autre identifiant`;
          return res.status(404).json({message})
        }
        // const message = `L'entreprise ${command.name} a bien été modifié.`
        res.json({message, data: command })
      })
    })
    .catch(error => {
      
      const message = 'La commande n\'a pas pu être modifié. Réesayez dans quelques instants.'
      res.status(500).json({message, data: error})
    })
  })
}