const { User, UserRole, Role } = require('../../db/sequelize')
const bcrypt = require('bcrypt')
const { ValidationError } = require('sequelize')  
const checkEmailAndPass = require('../../middlewares/checkEmailAndPass')
const checkPhoneNumber = require('../../middlewares/checkPhoneNumber')

module.exports = (app) => {

    let role;

    app.post('/api/register', checkEmailAndPass, (req, res) => {

        if(req.body.user_name.length > 15 || req.body.user_name.length < 2){
            return res.status(400).json({'erreur': 'Votre pseudo doit être compris entre 3 et 15 caractères.'})
        }

        passwordHash = bcrypt.hashSync(req.body.user_password, 10);
        Role.findByPk(1)
      .then(rolename => {
        
        roleId = rolename.dataValues.id
        
      })
        User.create({
            email: req.body.email,
            user_password: passwordHash,
            user_name: req.body.user_name,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            avatar: req.body.avatar,
            birth_date: req.body.birth_date,
            phone_number: req.body.phone_number,
            street_number: req.body.street_number,
            batiment: req.body.batiment,
            postal_code: req.body.postal_code,
            street_name: req.body.street_name,
            dt_inscription: req.body.dt_inscription,
            role: req.body.role
          },
          
           { fields: ['email', 'user_password', 'user_name', 'firstname', 'lastname', 'avatar', 'birth_date', 'phone_number', 'num_rue', 'street_number', 'batiment', 'postal_code', 'street_name', 'dt_inscription', 'role'] }

          
          ).then(user => {

            
            
            const userHasRole = UserRole.create({
              UserId: user.id,
              RoleId: roleId,
            })
            const message = `L'utilisateur a été crée avec succès`;
            return res.status(201).json({message: message, data: user})

          }).catch(error => {
            
            if(error instanceof ValidationError){
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = `L'utilisateur n\'a pas pu être connecté. Réesayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
        
        
        

        
    })
}


