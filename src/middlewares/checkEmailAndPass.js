

module.exports = function checkEmailAndPass(req, res, next)  {
    try {
        const { email, user_password } = req.body

        const regex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
        if (email === undefined || !regex.test(email.trim()))
            return res.status(401).json({ error: true, message: 'L\'adresse email n\'est pas au bon format, veuillez réesayer avec un format valide !'})
        else if (user_password === undefined || user_password.length < 2)
            return res.status(401).json({ error: true, message: 'Le mot de passe ne peut pas être inférieur à 2 caractères' })
        else
            next()

    } catch (err) {
        return res.status(500).json({ error: true, message: 'Error server' })
    }
}
