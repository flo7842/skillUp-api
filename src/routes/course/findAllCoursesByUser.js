const { Command_line, Course, Command, User, sequelizeDb } = require('../../db/sequelize')
const { Op } = require('sequelize') 
const { Sequelize} = require('sequelize');
const auth = require('../../auth/auth')
const { QueryTypes } = require('sequelize');
const { queryMaker } = require('../../db/requete');


module.exports = (app) => {
  app.get('/api/user-courses/:id', auth, async(req, res) => {
    
    await queryMaker("SELECT", "Users.email, Courses.*", "Users", "INNER JOIN Commands ON Commands.UserId = Users.id "+
    "INNER JOIN Command_lines ON Command_lines.CommandId = Commands.id "+
    "INNER JOIN Courses ON Command_lines.CourseId = Courses.id", "WHERE","Users.id = " + req.params.id, req.params.id, QueryTypes.SELECT).then(user => {

      console.log(user)
      
  
  
    const message = 'La liste des cours de l\'utilisateur a bien été récupérés.'
    
    res.json({ message, data: user })
  }).catch(err =>{
    console.log(err)
  })
  })
}