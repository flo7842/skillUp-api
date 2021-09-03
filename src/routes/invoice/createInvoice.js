const { Invoice } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/invoice', auth, (req, res) => {
        
        Invoice.create({
            payment_method: req.body.payment_method,
            CompanyId: req.body.CompanyId,
            CommandId: req.body.CommandId
          },
          
           { fields: ['payment_method', 'CompanyId', 'CommandId'] }

          
          ).then(invoice => {
            
            if(invoice.CommandId == null){
              const message = `L'identifiant de la facture ne peut pas être null`;
              return res.status(400).json({message: message})
            }else{

              const message = `La facture a été crée avec succès`;
              return res.status(201).json({message: message})
            }
    

          }).catch(error => {
            
            
            const message = `La facture n\'a pas pu être crée. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}