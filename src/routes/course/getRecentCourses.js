const { Course} = require('../../db/sequelize')

const auth = require('../../auth/auth')
const { Op } = require('sequelize')


  
module.exports = (app) => {
  app.get('/api/recent-courses', auth, (req, res) => {
    Course.findAll({
      order: [['datePublish', 'DESC']],
      limit: 5
    })
      .then(course => {
        
        res.status(200).json({ data: course })
      }).catch(err =>{
        console.log(err)
      })
  })
}