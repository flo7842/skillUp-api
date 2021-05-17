const { User, Role } = require('../../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/user/:id', (req, res) => {
    User.findOne({
      where: {
        id: req.params.id
      }, include: Role})
      .then(user => {
        const message = 'Un utilisateur a bien été trouvé.'
        res.json({ message, data: user })
      })
  })
}