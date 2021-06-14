const { Command_line, Course, Command, User, sequelizeDb } = require('../../db/sequelize')
const { Op } = require('sequelize') 
const { Sequelize} = require('sequelize');
const auth = require('../../auth/auth')
const { QueryTypes } = require('sequelize');
const { queryMaker } = require('../../db/requete');


module.exports = (app) => {
  app.get('/api/commandliness/:id', async(req, res) => {
    
    await queryMaker("SELECT", "UserId, CommandId, CourseId, author, title, description, image, rate, price, datePublish", "command_lines", "INNER JOIN", "WHERE", req.params.id, QueryTypes.SELECT).then(user => {

      console.log(user)
    
    const message = 'La liste des cours de l\'utilisateur a bien été récupérés.'
    
    res.json({ message, data: user })
  }).catch(err =>{
    console.log(err)
  })
  })
}