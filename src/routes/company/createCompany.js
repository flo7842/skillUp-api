const { Company } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/company', auth, (req, res) => {
        
        Company.create({
            name: req.body.name,
            street_name: req.body.street_name,
            street_number: req.body.street_number,
            postal_code: req.body.postal_code,
            country: req.body.country,
            siret: req.body.siret
          },
          
           { fields: ['name', 'street_name', 'street_number', 'postal_code', 'country', 'siret'] }

          
          ).then(company => {
            
            if(company.name.length === 0){
                
                const message = `Aucune valeur définis pour le nom de l'entreprise`;
                return res.status(401).json({ message })

            }

    
            const message = `L'entreprise a été crée avec succès`;
            return res.status(201).json({message: message})

          }).catch(error => {
            
            if(error instanceof ValidationError){
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = `L'entreprise n'a pas pu être crée. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}