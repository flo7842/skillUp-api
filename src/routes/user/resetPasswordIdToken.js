const { User } = require('../../db/sequelize')
const jwt = require('jsonwebtoken')
const path = require('path');
const template = require('../../../public/templatePassword')
module.exports = (app) => {

    app.get('/api/resetpassword/:id/:token', function(req, res) {

        User.findByPk(req.params.id)
        .then(user => {
           
           
            var secret = user.user_password + '- 12345';
            const decodedToken = jwt.verify(req.params.token, secret, (error, decodedToken) => {
                
                if(error) {
                  const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
                  return res.status(401).json({ message, data: error })
                }else{

                    res.send(template(decodedToken.id, req.params.token));
                }
            })
            console.log(decodedToken)
            //var payload = jwt.decode(req.params.token, secret);
            
        })
        
    });

}