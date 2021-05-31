const { Course } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/course/:id', auth, (req, res) => {
    Course.findByPk(req.params.id)
      .then(course => {

        const message = 'Le cour a bien été trouvé.'
        res.status(200).json({ message: message, data: course })
      })
  })
}