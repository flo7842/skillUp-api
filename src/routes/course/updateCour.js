const { Course } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.put('/api/course/:id', auth, (req, res) => {
    const id = req.params.id
    Course.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Course.findByPk(id).then(course => {
        if(course === null){
          const message = `Le cour demandé n'existe pas. Réesayez avec un autre identifiant`;
          return res.status(404).json({message})
        }
        const message = `Le cour ${course.title} a bien été modifié.`
        res.json({message, data: course })
      })
    })
    .catch(error => {
      
      const message = 'Le cour n\'a pas pu être modifié. Réesayez dans quelques instants.'
      res.status(500).json({message, data: error})
    })
  })
}