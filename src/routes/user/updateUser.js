const { User } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')  
const auth = require('../../auth/auth')
const bcrypt = require('bcrypt')
module.exports = (app) => {
  app.put('/api/user/:id', auth, (req, res) => {
    const id = req.params.id
    User.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return User.findByPk(id).then(user => {
        if(user === null){
          const message = `L'utilisateur demandé n'existe pas. Réesayez avec un autre identifiant`;
          return res.status(404).json({message})
        }

        passwordHash = bcrypt.hashSync(req.body.user_password, 10);


        const message = `L'utilisateur ${user.email} a bien été modifié.`

        user.user_password = passwordHash
        user.update({
            email: user.email,
            user_password: passwordHash,
            user_name: user.user_name,
            firstname: user.firstname,
            lastname: user.lastname,
            avatar: user.avatar,
            birth_date: user.birth_date,
            phone_number: user.phone_number,
            street_number: user.street_number,
            batiment: user.batiment,
            postal_code: user.postal_code,
            street_name: user.street_name,
            dt_inscription: user.dt_inscription,
            role: user.role
        })
        res.json({message, data: user })
      })
    })
    .catch(error => {
      if(error instanceof UniqueConstraintError){
        return res.status(400).json({ message: error.message, data: error })
      }
      if(error instanceof ValidationError){
        return res.status(400).json({ message: error.message, data: error })
      }
      const message = 'L\'utilisateur n\'a pas pu être modifié. Réesayez dans quelques instants.'
      res.status(500).json({message, data: error})
    })
  })
}