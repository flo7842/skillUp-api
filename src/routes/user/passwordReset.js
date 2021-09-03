const nodemailer = require("nodemailer");
const { User } = require('../../db/sequelize')
const jwt = require('jsonwebtoken')

module.exports = (app) => {
   
    
    app.post('/api/passwordreset', function (req, res) {
        
            var emailAddress = req.body.email;
            
           
            User.findOne({ where: { email: emailAddress } })
            .then(user => {
                
                var payload = {
            
                id: user.id,
                email: emailAddress
            };

            

            
            var secret = user.user_password + process.env['PRIVATE_KEY_TOKEN_MAIL'];
          

            var token = jwt.sign(payload, secret, { expiresIn: '5m' });

            let transporter;
            let mailOption;

            if(process.env.NODE_ENV === 'production'){
                transporter = nodemailer.createTransport({
                    host: process.env['MAIL_HOST_SMTP'],
                    port: process.env['MAIL_PORT'],
                    secure: true, // true for 465, false for other ports
                    auth: {
                    user: process.env['MAIL_USER'],
                    pass: process.env['PASSWORD_MAIL'] // generated ethereal user
                    },
                });

                mailOption = {
                    from: process.env['MAIL_USER'],
                    to: emailAddress,
                    subject: "Mot de passe oublié - skillUp",
                    html: '<a href="https://flodevfullstack.com/api/resetpassword/' + payload.id + '/' + token + '">Modifier le mot de passe</a>'
                };
            }else{
                transporter = nodemailer.createTransport({
                    host: process.env['MAIL_HOST_SMTP_LOCAL'],
                    port: process.env['MAIL_PORT_LOCAL'],
                    secure: false, // true for 465, false for other ports
                    auth: {
                    user: process.env['MAIL_USER_LOCAL'],
                    pass: process.env['PASSWORD_MAIL_LOCAL'] // generated ethereal user
                    },
                });

                mailOption = {
                    from: process.env['MAIL_USER_LOCAL'],
                    to: emailAddress,
                    subject: "Mot de passe oublié - skillUp",
                    html: '<a href="http://localhost:3000/api/resetpassword/' + payload.id + '/' + token + '">Modifier le mot de passe</a>'
                };
            }
            
        
            transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                    return console.log(error);
                } else{
                    console.log('Email has been sent');
                    res.send(info);
                }
            });
        })
        

         
            // TODO: Using email, find user from your database.
            
          

            // TODO: Make this a one-time-use token by using the user's
            // current password hash from the database, and combine it
            // with the user's created date to make a very unique secret key!
            // For example:
            //var secret = user.user_password + '-' + user.created.getTime();

           

            
            
            // TODO: Send email containing link to reset password.
            // In our case, will just return a link to click.
            // res.send('<a href="/resetpassword/' + payload.id + '/' + token + '">Reset password</a>');
        
    });

}