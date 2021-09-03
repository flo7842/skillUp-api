const { Command, User } = require('../../db/sequelize')
const { Op } = require('sequelize') 
const auth = require('../../auth/auth')
const { QueryTypes } = require('sequelize');
const { queryMaker } = require('../../db/requete');

module.exports = (app) => {
  app.get('/api/categorie/:id', auth, async (req, res) => {
    
    await queryMaker("SELECT", "Categories.name",
    "Categories",
    "INNER JOIN Cour_category ON CategoryId = Categories.id "+
    "INNER JOIN Courses ON CourseId = Courses.id", "WHERE","Courses.id = " + req.params.id, req.params.id, QueryTypes.SELECT).then(user => {
  
      const message = 'Les catégories ont bien été récupérées.'
    
      res.json({ message, data: user })
    }).catch(err =>{
      console.log(err)
    })
  })
}


  
  
