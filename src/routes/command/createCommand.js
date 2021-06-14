const { Command } = require('../../db/sequelize')
const { ValidationError } = require('sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/command', auth, (req, res) => {
        
        Command.create({
            UserId: req.body.UserId
          },
          
           { fields: ['UserId'] }

          
          ).then(command => {
            
            
            console.log(command)
            const message = `La commande a été crée avec succès.`;
            return res.status(201).json({message: message, data: command})
            

          }).catch(error => {
            
            const message = `La commande n'a pas pu être crée. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}