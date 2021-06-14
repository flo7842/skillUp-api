const { User } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')  
const auth = require('../../auth/auth')
const bcrypt = require('bcrypt')
module.exports = (app) => {
  app.put('/api/reset-password-modify/:id', auth, (req, res) => {

    return User.findByPk(req.params.id).then(async user => {
        if(user == null){
            const message = `L'utilisateur demandé n'existe pas. Réesayez avec un autre identifiant`;
            return res.status(404).json({message})
        }else{
            let bool = await bcrypt.compare(req.body.oldpass, user.user_password)
            console.log(req.body.oldpass)
            
            if(bool == false){
                return res.json('Les deux mots de passe ne corespondent pas !')
            }else{
                let passwordHash = await bcrypt.hashSync(req.body.user_password, 10);
                
                user.update({
                    user_password: passwordHash
                })
    
                const message = `L'utilisateur a ${user.email} bien été modifié.`

                return res.json({ message, data: passwordHash })
            }
        }
    })
    .catch(error => {
      const message = 'L\'utilisateur n\'a pas pu être modifié. Réesayez dans quelques instants.'
      res.status(500).json(message)
    })
  })
}