const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
const { ValidationError, UniqueConstraintError, EmptyResultError } = require('sequelize')  
const checkEmailAndPass = require('../middlewares/checkEmailAndPass')
module.exports = (app) => {
    app.post('/api/register', checkEmailAndPass, (req, res) => {
       

        // hash password
        
        passwordHash = bcrypt.hashSync(req.body.user_password, 10);
        User.create({
            email: req.body.email,
            user_password: passwordHash,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            avatar: req.body.avatar,
            yearsold: req.body.yearsold,
            phone_number: req.body.phone_number,
            street_number: req.body.street_number,
            batiment: req.body.batiment,
            postal_code: req.body.postal_code,
            street_name: req.body.street_name,
            dt_inscription: req.body.dt_inscription,
            role: req.body.role
          },
          
           { fields: ['email', 'user_password', 'firstname', 'lastname', 'avatar', 'yearsold', 'phone_number', 'num_rue', 'street_number', 'batiment', 'postal_code', 'street_name', 'dt_inscription', 'role'] }

           
          
          
          ).then(user => {
            
            if(user.user_password.length === 0){
                
                const message = `Aucune valeur définis pour le mot de passe`;
                return res.status(401).json({ message })

            }

            if(user.user_password.length < 3){
                const message = `Votre mot de passe est trop court (min = 3)`;
                return res.status(401).json({ message })
            }
            
            
            
           
    
            const message = `L'utilisateur a été crée avec succès`;
            return res.json({ message })

          }).catch(error => {
            
            if(error instanceof ValidationError){
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = `L'utilisateur n\'a pas pu être connecté. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
          // let's assume the default of isAdmin is false
        
        

        
    })
}


