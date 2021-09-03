const { Command, User } = require('../../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../../auth/auth')
const { QueryTypes } = require('sequelize');
const { queryMaker } = require('../../db/requete');

module.exports = (app) => {
  app.get('/api/invoice-user/:id', auth, async (req, res) => {
    
    await queryMaker("SELECT", "Commands.id AS CommandId, Users.email, Courses.title, "+
    "Companies.name, Companies.street_name, Companies.street_number, " +
    "Companies.postal_code, Companies.country, Companies.siret, Companies.sociale, Companies.city, Users.firstname, " +
    "Users.lastname, Users.street_name AS street_name1, Users.street_number AS street_number1, " +
    "Users.postal_code AS postal_code1, Invoices.createdAt, Invoices.payment_method, Courses.price",
    "Command_lines",
    "INNER JOIN Courses ON Courses.id = Command_lines.CourseId "+
    "INNER JOIN Commands ON Commands.id = Command_lines.CommandId "+
    "INNER JOIN Users ON Users.id = Commands.UserId "+
    "INNER JOIN Invoices ON Commands.id = Invoices.CommandId " +
    "INNER JOIN Companies ON Invoices.CompanyId = Companies.id", "WHERE","Commands.id = " + req.params.id, req.params.id, QueryTypes.SELECT).then(user => {
  
      const message = 'La facture de l\'utilisateur a bien été récupérée.'
    
      res.json({ message, data: user })
    }).catch(err =>{
      console.log(err)
    })
  })
}
