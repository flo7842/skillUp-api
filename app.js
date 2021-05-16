const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')



const app = express()
const port = 3000



app
.use(cors())
.use(morgan('dev'))
.use(bodyParser.json())
sequelize.initDb()

// Here I place the endpoints
require('./src/routes/user/updateUser')(app)
require('./src/routes/user/deleteUser')(app)
require('./src/routes/user/register')(app)
require('./src/routes/user/login')(app)

require('./src/routes/user/forgotPassword')(app)
require('./src/routes/user/resetPassword')(app)
require('./src/routes/user/passwordReset')(app)
require('./src/routes/user/resetPasswordIdToken')(app)

require('./src/routes/category/createCategory')(app)
require('./src/routes/category/deleteCategory')(app)


// On ajoute la gestion des erreurs
app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL."
    res.status(404).json({message})
})

app.listen(port, () => console.log(`notre application node est démarré sur : http://localhost:${port}`))