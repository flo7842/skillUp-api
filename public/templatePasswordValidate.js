var path = require('path');
module.exports = templateValidate = () => {

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
            <h1>Votre mot de passe a été correctement modifié.<h1> <br/><br/><br/> 
            <h3>Vous pouvez quitter cette page et entrer vos nouveaux identifiants sur l\'application.<h3>
        </div>
    </body>
    </html>`
}