const auth = require('../../auth/auth')
const { QueryTypes } = require('sequelize');
const { queryMaker } = require('../../db/requete');

module.exports = (app) => {
  app.get('/api/category-course/:search', auth, async (req, res) => {
    
    await queryMaker("SELECT", "Categories.name, Courses.id, Courses.author, Courses.title, Courses.description, Courses.image, Courses.rate, Courses.price", "Categories",
      "INNER JOIN Cour_category ON Cour_category.CategoryId = Categories.id "+
      "INNER JOIN Courses ON Cour_category.CourseId = Courses.id ",
      "WHERE","Categories.name LIKE '%" + req.params.search + "%'", req.params.search, QueryTypes.SELECT).then(user => {
  
      const message = 'Les cours de la catégorie ' + req.params.search + ' ont bien été récupérés.'
    
      res.json({ message, data: user })
    }).catch(err =>{
      console.log(err)
    })
  })
}