const { Command } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/command', (req, res) => {
      console.log(req.body)
        Command.create({
         
            taxe: req.body.taxe,
            UserId: req.body.UserId
          },
          
           { fields: ['taxe', 'UserId'] }

          
          ).then(command => {
            
            

    
            const message = `La commande a été crée avec succès`;
            return res.json({ message })

          }).catch(error => {
            
            const message = `La commande n'a pas pu être crée. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}