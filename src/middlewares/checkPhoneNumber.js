

module.exports = function checkPhoneNumber(req, res, next)  {
    try {
        const { phone_number } = req.body
        
        const regex = new RegExp(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/g);
        if (phone_number === undefined || !regex.test(phone_number.trim()))
            return res.status(401).json({ error: true, message: 'Le numéro de téléphone n\'est pas au bon format, veuillez réesayer avec un format valide !'})
        else
            next()
    } catch (err) {
        return res.status(500).json({ error: true, message: 'Error server' })
    }
}
