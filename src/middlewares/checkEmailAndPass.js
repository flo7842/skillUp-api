

module.exports = function checkEmailAndPass(req, res, next)  {
    try {
        const { email, user_password } = req.body
        
        const regexEmail = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
        const regexPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g);
        
        if (email === undefined || !regexEmail.test(email.trim()))
            return res.status(401).json({ error: true, message: 'L\'adresse email n\'est pas au bon format, veuillez réesayer avec un format valide !'})
        else if (user_password === undefined || user_password.length < 8)
            return res.status(401).json({ error: true, message: 'Le mot de passe ne peut pas être inférieur à 8 caractères' })
        else if (user_password === undefined || !regexPassword.test(user_password.trim()))
            return res.status(401).json({ error: true, message: 'Le mot de passe doit être composé d\'un minimum de huit caractères, au moins une lettre majuscule, une lettre minuscule et un chiffre.' })
        else
            next()

    } catch (err) {
        return res.status(500).json({ error: true, message: 'Erreur serveur' })
    }
}
