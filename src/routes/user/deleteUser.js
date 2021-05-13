const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/user/:id', auth, (req, res) => {
    User.findByPk(req.params.id).then(user => {
      if(user === null){
        const message = `L'utilisateur demandé n'existe pas. Réesayez avec un autre identifiant`;
        return res.status(404).json({message})
      }
      const userDeleted = user;
      return User.destroy({
        where: { id: user.id }
      })
      .then(_ => {
        const message = `L'utilisateur ${userDeleted.email} a bien été supprimé.`
        res.json({message, data: userDeleted })
      })
      .catch(error => {
        const message = 'L\'utilisateur n\'a pas pu être supprimé. Réesayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
  })
}