var path = require('path');

module.exports = template = (payloadId, token) => {

    let urlResetPass;

    if(process.env.NODE_ENV === 'production'){
        urlResetPass = 'https://flodevfullstack.com/api/resetpassword';
    }else{
        urlResetPass = 'http://localhost:3000/api/resetpassword';
    }

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
        <form action=${urlResetPass} method="POST" id="form">
            <input type="hidden" name="id" value="${payloadId}" />
            <input type="hidden" name="token" value="${token}" />
            <label for="user_password">Entrez votre nouveau mot de passe</label>
            <input type="password" name="user_password" value="" placeholder="Nouveau mot de passe..." />
            <label for="user_password">Validez votre nouveau mot de passe</label>
            <input type="password" name="passwordConfirm" value="" placeholder="Entrer le mot de passe une deuxième fois" />
            <button type="submit">Reset Password</button>
        </form>
    </div>
</body>
</html>`
}