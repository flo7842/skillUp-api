const { Course } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/course', auth, (req, res) => {
        
        Course.create({
            author: req.body.author,
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            rate: req.body.rate,
            price: req.body.price,
            datePublish: req.body.datePublish,
            UserId: req.body.UserId
          },
          
           { fields: ['author', 'title', 'description', 'image', 'rate', 'price', 'datePublish', 'UserId'] }

          
          ).then(course => {
            
            // if(course.name.length === 0){
                
            //     const message = `Aucune valeur définis pour la catégoriee`;
            //     return res.status(401).json({ message })

            // }

    
            const message = `Le cour a été crée avec succès`;
            return res.json({ message })

          }).catch(error => {
            
           
            const message = `Le cour n\'a pas pu être crée. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}