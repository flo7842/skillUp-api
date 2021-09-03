const { Command, User } = require('../../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../../auth/auth')
const { QueryTypes } = require('sequelize');
const { queryMaker } = require('../../db/requete');

module.exports = (app) => {
  app.get('/api/commands/:id', auth, async (req, res) => {
    
    await queryMaker("SELECT", "Commands.id AS commandId, Commands.createdAt, Courses.title, Courses.price, Invoices.id as invoiceId", "Commands", "INNER JOIN Users ON Commands.UserId = Users.id "+
      "INNER JOIN Command_lines ON Commands.id = Command_lines.CommandId "+
      "INNER JOIN Courses ON Courses.id = Command_lines.CourseId " +
      "INNER JOIN Invoices ON Commands.id = Invoices.CommandId", "WHERE","Users.id = " + req.params.id, req.params.id, QueryTypes.SELECT).then(user => {
  
      const message = 'Les commandes de l\'utilisateur ont bien été récupérés.'
    
      res.json({ message, data: user })
    }).catch(err =>{
      console.log(err)
    })
  })
}