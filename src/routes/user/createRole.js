const { Role } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/role', (req, res) => {
        
        Role.create({
            name: req.body.name,
          },
          
           { fields: ['name'] }

          
          ).then(category => {
            
           
    
            const message = `La catégorie a été crée avec succès`;
            return res.json({ message })

          }).catch(error => {
            
            
            const message = `L'utilisateur n\'a pas pu être connecté. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}