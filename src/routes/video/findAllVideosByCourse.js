const { Command_line, Course, Command, User, sequelizeDb } = require('../../db/sequelize')
const { Op } = require('sequelize') 
const { Sequelize} = require('sequelize');
const auth = require('../../auth/auth')
const { QueryTypes } = require('sequelize');
const { queryMaker } = require('../../db/requete');


module.exports = (app) => {
  app.get('/api/user-videos/:id', auth, async(req, res) => {
    await queryMaker(
      "SELECT", "Courses.id, Videos.description, Videos.image, Videos.url", "Courses", 
      "INNER JOIN `Videos` ON `Videos`.`CourseId` = `Courses`.`id`",
      "WHERE", "Courses.id = " + req.params.id, req.params.id, QueryTypes.SELECT).then(user => {

        console.log(user)
    
        const message = 'La liste des vidéos associées au cours ont bien été récupérés.'
    
        res.json({ message, data: user })
    }).catch(err =>{

      console.log(err)

    })
  })
}