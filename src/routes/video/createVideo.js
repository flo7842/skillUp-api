const { Video } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/video', auth, (req, res) => {
        
        Video.create({
            url: req.body.url,
            description: req.body.description,
            image: req.body.image
          },
          
           { fields: ['url, description, image'] }

          
          ).then(video => {
            
            if(video.url.length === 0){
                
                const message = `Aucune valeur définis pour l'url de la video`;
                return res.status(401).json({ message })

            }

            if(video.image.length === 0){
                
                const message = `Aucune valeur définis pour l'image de la video`;
                return res.status(401).json({ message })

            }

    
            const message = `La vidéo a été crée avec succès`;
            return res.status(201).json({message: message})

          }).catch(error => {
            
            if(error instanceof ValidationError){
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = `L'utilisateur n\'a pas pu être connecté. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}