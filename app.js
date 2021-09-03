const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')
const cors = require('cors')
var path = require('path');
var fs = require('fs')
var morgan = require('morgan')
const helmet = require("helmet");

const app = express()
const port = process.env.PORT || 3000
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })


app
.use(cors())
.use(bodyParser.json())
.use(express.json({ limite : '10kb' }))
.use(morgan('combined', { stream: accessLogStream }))
.use(helmet())
.use(express.static(path.join(__dirname, 'public')));
require('dotenv').config({path: __dirname + '/.env'})
sequelize.initDb()
app.get('/', (req, res) => {
    res.json('Hello Man !')
})

// Here I place the endpoints
require('./src/routes/user/updateUser')(app)
require('./src/routes/user/deleteUser')(app)
require('./src/routes/user/register')(app)
require('./src/routes/user/login')(app)
require('./src/routes/user/createRole')(app)
require('./src/routes/user/getUserByRole')(app)

require('./src/routes/user/updatePassword')(app)
require('./src/routes/user/forgotPassword')(app)
require('./src/routes/user/resetPassword')(app)
require('./src/routes/user/passwordReset')(app)
require('./src/routes/user/resetPasswordIdToken')(app)

require('./src/routes/category/createCategory')(app)
require('./src/routes/category/deleteCategory')(app)
require('./src/routes/category/findAllCoursesByCategory')(app)

require('./src/routes/course/createCourse')(app)
require('./src/routes/course/findCourseByPk')(app)
require('./src/routes/course/findAllCourses')(app)
require('./src/routes/course/getBestsTuto')(app)
require('./src/routes/course/getRecentCourses')(app)
require('./src/routes/course/getCategoriesByCourse')(app)
require('./src/routes/course/findAllCoursesByUser')(app)

require('./src/routes/command/createCommand')(app)
require('./src/routes/command/deleteCommand')(app)
require('./src/routes/command/findAllCommands')(app)
require('./src/routes/command/findAllCommandByUser')(app)
require('./src/routes/command/findAllCommandLineByCommand')(app)

require('./src/routes/command/createCommandLine')(app)

require('./src/routes/video/createVideo')(app)
require('./src/routes/video/findAllVideosByCourse')(app)

require('./src/routes/company/findCompanyByPk')(app)
require('./src/routes/company/createCompany')(app)
require('./src/routes/company/updateCompany')(app)
require('./src/routes/company/deleteCompany')(app)

require('./src/routes/invoice/createInvoice')(app)
require('./src/routes/invoice/findInvoiceByUser')(app)

// On ajoute la gestion des erreurs
app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL."
    res.status(404).json({message})
})

app.listen(port, () => console.log(`notre application node est démarré sur : http://localhost:${port}`))