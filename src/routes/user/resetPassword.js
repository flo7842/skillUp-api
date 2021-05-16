const { User } = require('../../db/sequelize')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const bcrypt = require('bcrypt')


var jsonParser = bodyParser.json()


var urlencodedParser = bodyParser.urlencoded({ extended: false })
const template = require('../../../public/templatePassword')


module.exports = (app) => {

    app.post('/api/resetpassword', urlencodedParser, function(req, res) {
       
        User.findByPk(req.body.id)
        .then(async user => {
           

            var secret = user.user_password + '- 12345';
            
            //var payload = jwt.decode(req.body.token, secret);
            const decodedToken = jwt.verify(req.body.token, secret, (error, decodedToken) => {
                if(error) {
                  const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
                  return res.status(401).json({ message, data: error })
                }else{

                    let password = req.body.user_password
                    let passwordConfirm = req.body.passwordConfirm
        
                    if(password == passwordConfirm){
        
                        let passwordHash = bcrypt.hashSync(req.body.user_password, 10);
                        user.update({
                            user_password: passwordHash
                          })
                          res.send('Votre mot de passe a été correctement modifié.');
                    }else{
                        res.send('Les deux mots de passe ne sont pas identiques veuillez réesayer.'+ template(decodedToken.id, req.body.token));
                    }
                }
            })
            
            
        })
        
    });

}