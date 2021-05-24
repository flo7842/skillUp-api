const { Company } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/company/:id', auth, (req, res) => {
    Company.findByPk(req.params.id)
      .then(company => {

        const message = 'L\'entreprise a bien été trouvé.'
        res.json({ message, data: company })
      })
  })
}