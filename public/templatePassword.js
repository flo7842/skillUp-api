var path = require('path');
module.exports =  template = (payloadId, token) => {

    const viewPath = (path.join(__dirname, '/css/style.css')).replace(/\\/g, '/')

return `

    <!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Titre de la page</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div id="container">
        <form action="http://localhost:3000/api/resetpassword" method="POST" id="child">
            <input type="hidden" name="id" value="${payloadId}" />
            <input type="hidden" name="token" value="${token}" />
            <input type="password" name="user_password" value="" placeholder="Enter your new password..." />
            <input type="password" name="passwordConfirm" value="" placeholder="Entrer le mot de passe une deuxième fois" />
            <button type="submit">Reset Password</button>
        </form>
    </div>
</body>
</html>`
}