const { Course } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/course/:id', auth, (req, res) => {
    Course.findByPk(req.params.id).then(course => {
      if(course === null){
        const message = `Le cour demandé n'existe pas. Réesayez avec un autre identifiant`;
        return res.status(404).json({message})
      }
      const courseDeleted = course;
      return Course.destroy({
        where: { id: course.id }
      })
      .then(_ => {
        const message = `Le cour ${courseDeleted.title} a bien été supprimé.`
        res.json({message, data: courseDeleted })
      })
      .catch(error => {
        const message = 'Le cour n\'a pas pu être supprimé. Réesayez dans quelques instants.'
        res.status(500).json({message, data: error})
      })
    })
  })
}