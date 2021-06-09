const { Company } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/company/:id', auth, (req, res) => {
    Company.findByPk(req.params.id).then(company => {
      if(company === null){
        const message = `L'entreprise demandé n'existe pas. Réesayez avec un autre identifiant`;
        return res.status(404).json({message})
      }
      const companyDeleted = company;
      return Company.destroy({
        where: { id: company.id }
      })
      .then(_ => {
        const message = `L'entreprise ${companyDeleted.name} a bien été supprimée.`
        res.json({message, data: companyDeleted })
      })
      .catch(error => {
        const message = 'L\'entreprise n\'a pas pu être supprimé. Réesayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
  })
}