const { Course } = require('../../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../../auth/auth')

module.exports = (app) => {
  app.get('/api/courses', auth, (req, res) => {
    Course.findAll()
        .then(course => {
          const message = 'La liste des cours a bien été récupérée.'
          res.json({ message, data: course })
        })
        .catch(error => {
          const message = 'La liste des cours n\'a pas pu être récupérée. Réessayez dans quelques instants.'
          res.status(500).json({ message, data: error })
        })
  })
}