const { User } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = (app) => {
  
  app.post('/api/login', (req, res) => {

    let email = req.body.email
    let body_password = req.body.user_password

    if(email == null || email == null){
        return res.status(400).json({ 'erreur': 'Des paramètres sont manquants !' })
    }
  
    User.findOne({ where: { email: email } }).then(user => {
      
        if(!user){
            const message = "L'utilisateur demandé n'existe pas."
            return res.status(401).json({ message })
        }
        bcrypt.compare(body_password, user.user_password).then(isPasswordValid => {
          if(!isPasswordValid) {
            const message = `Le mot de passe est incorrect.`;
            return res.status(401).json({ message })
          }
        

          // JWT
          const token = jwt.sign(
              { userId: user.id },
              process.env['PRIVATE_KEY_TOKEN'],
              { expiresIn: '24h' }
          )

         // const message = ``;
          return res.json({ success: 'L\'utilisateur a été connecté avec succès', data: user, token })
        })
    })
    .catch(error => {
        const message = `L'utilisateur n\'a pas pu être connecté. Réesayez dans quelques instants.`;
        return res.json({ message, data: error })
    })
  })
}