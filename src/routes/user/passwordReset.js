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
            
            console.log(process.env.PASSWORD_MAIL)

            let transporter = nodemailer.createTransport({
                host: "smtp.live.com",
                port: 25,
                secure: false, // true for 465, false for other ports
                auth: {
                  user: "florian_bracq@hotmail.fr",
                  pass: process.env['PASSWORD_MAIL'] // generated ethereal user
                },
            });

            let mailOption = {
                from: `florian_bracq@hotmail.fr`,
                to: emailAddress,
                subject: "Subject of mail",
                html: '<a href="http://localhost:3000/api/resetpassword/' + payload.id + '/' + token + '">Reset password</a>'
            };
        
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