const { Course} = require('../../db/sequelize')

const auth = require('../../auth/auth')
const { Op } = require('sequelize')


  
module.exports = (app) => {
  app.get('/api/best-courses', auth, (req, res) => {
    Course.findAll({ where: {
       
        rate: {
            [Op.gt]: 3
        }
  
    } })
      .then(course => {
        let message;
        if(course.length > 2){

            message = `${course.length} cours ont été trouvés.`
        }else{
            message = `Un cour a été trouvé.`
        }
        res.status(200).json({ message: message, data: course })
      })
  })
}