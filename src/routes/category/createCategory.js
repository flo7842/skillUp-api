const { Category } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/category', auth, (req, res) => {
        
        Category.create({
            name: req.body.name
          },
          
           { fields: ['name'] }

          
          ).then(category => {
            
            if(category.name.length === 0){
                
                const message = `Aucune valeur définis pour la catégoriee`;
                return res.status(401).json({ message })

            }

    
            const message = `La catégorie a été crée avec succès`;
            return res.json({ message })

          }).catch(error => {
            
            if(error instanceof ValidationError){
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = `L'utilisateur n\'a pas pu être connecté. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}