const { Role } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/role', (req, res) => {
        
        Role.create({
            name: req.body.name,
          },
          
           { fields: ['name'] }

          
          ).then(role => {
            
           
    
            const message = `Le role ${role.name} a été crée avec succès`;
            return res.json({ message })

          }).catch(error => {
            
            
            const message = `Le role n\'a pas pu être crée. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}