const { Invoice } = require('../../db/sequelize')
const auth = require('../../auth/auth')

module.exports = (app) => {
    app.post('/api/invoice', (req, res) => {
        
        Invoice.create({
            invoiceDate: req.body.invoiceDate,
            payment_method: req.body.payment_method,
            CompanyId: req.body.CompanyId,
            UserId: req.body.UserId,
            CommandId: req.body.CommandId
          },
          
           { fields: ['invoiceDate', 'payment_method', 'CompanyId', 'UserId', 'CommandId'] }

          
          ).then(invoice => {
            
           
    
            const message = `La facture a été crée avec succès`;
            return res.status(201).json({message: message})

          }).catch(error => {
            
            
            const message = `La facture n\'a pas pu être crée. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}