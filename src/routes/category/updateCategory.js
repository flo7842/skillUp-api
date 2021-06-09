const { Category } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.put('/api/category/:id', auth, (req, res) => {
    const id = req.params.id
    Category.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Category.findByPk(id).then(category => {
        if(category === null){
          const message = `La catégorie demandé n'existe pas. Réesayez avec un autre identifiant`;
          return res.status(404).json({message})
        }
        const message = `La category ${category.name} a bien été modifié.`
        res.json({message, data: category })
      })
    })
    .catch(error => {
      
      const message = 'La catégorie n\'a pas pu être modifié. Réesayez dans quelques instants.'
      res.status(500).json({message, data: error})
    })
  })
}