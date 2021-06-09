const { Category } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/category/:id', auth, (req, res) => {
    Category.findByPk(req.params.id).then(category => {
      if(category === null){
        const message = `La catégorie demandé n'existe pas. Réesayez avec un autre identifiant`;
        return res.status(404).json({message})
      }
      const categoryDeleted = category;
      return Category.destroy({
        where: { id: category.id }
      })
      .then(_ => {
        const message = `La catégorie ${categoryDeleted.name} a bien été supprimé.`
        res.json({message, data: categoryDeleted })
      })
      .catch(error => {
        const message = 'La catégorie n\'a pas pu être supprimé. Réesayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
  })
}