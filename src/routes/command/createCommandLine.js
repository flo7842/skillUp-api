const { Command_line } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/commandline', (req, res) => {
      console.log(req.body)
      
      Command_line.create({
         
            quantity: req.body.quantity,
            CommandId: req.body.CommandId,
            CourseId: req.body.CourseId
          },
          
           { fields: ['quantity', 'CommandId', 'CourseId'] }

          
          ).then(commandLine => {
            
            

    
            const message = `La ligne de commande a été crée avec succès`;
            return res.json({ message })

          }).catch(error => {
            
            const message = `La ligne de commande n'a pas pu être crée. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}