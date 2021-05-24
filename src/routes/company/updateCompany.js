const { Company } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.put('/api/company/:id', auth, (req, res) => {
    const id = req.params.id
    Company.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Company.findByPk(id).then(company => {
        if(company === null){
          const message = `L'entreprise demandé n'existe pas. Réesayez avec un autre identifiant`;
          return res.status(404).json({message})
        }
        const message = `L'entreprise ${company.name} a bien été modifié.`
        res.json({message, data: company })
      })
    })
    .catch(error => {
      
      const message = 'L\'entreprise n\'a pas pu être modifié. Réesayez dans quelques instants.'
      res.status(500).json({message, data: error})
    })
  })
}