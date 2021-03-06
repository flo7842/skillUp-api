const { Sequelize, DataTypes, model } = require('sequelize')
require('dotenv').config({path: '\.env'})

const UserModel = require('../models/user')
const CategoryModel = require('../models/category')
const CourseModel = require('../models/course')
const VideoModel = require('../models/video')
const RoleModel = require('../models/role')
const USERROLEModel = require('../models/user_role')
const CompanyModel = require('../models/company')
const InvoiceModel = require('../models/invoice')
const CommandModel = require('../models/command')
const Command_lineModel = require('../models/command_line')

const bcrypt = require('bcrypt')
  
let sequelizeDb

if(process.env.NODE_ENV === 'production'){

  sequelizeDb = new Sequelize(process.env['MYSQL_DB_NAME'], process.env['MYSQL_DB_USER'], process.env['MYSQL_DB_PASSWORD'], {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: true
  })
}else{

  sequelizeDb = new Sequelize(process.env['MYSQL_DB_NAME_LOCAL'], process.env['MYSQL_DB_USER_LOCAL'], process.env['MYSQL_DB_PASSWORD_LOCAL'], {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })
}

const User = UserModel(sequelizeDb, DataTypes)
const Category = CategoryModel(sequelizeDb, DataTypes)
const Course = CourseModel(sequelizeDb, DataTypes)
const Video = VideoModel(sequelizeDb, DataTypes)
const Role = RoleModel(sequelizeDb, DataTypes)
const UserRole = USERROLEModel(sequelizeDb, DataTypes)
const Company = CompanyModel(sequelizeDb, DataTypes)
const Invoice = InvoiceModel(sequelizeDb, DataTypes)
const Command = CommandModel(sequelizeDb, DataTypes)
const Command_line = Command_lineModel(sequelizeDb, DataTypes)

Command.hasMany(Command_line, { onDelete: 'cascade' });
Command_line.belongsTo(Command);
Course.hasOne(Command_line);
Command_line.belongsTo(Course);

Company.hasOne(Invoice);
Invoice.belongsTo(Company);

Course.hasOne(Video);
Video.belongsTo(Course);


// Invoice
Command.hasOne(Invoice);
Invoice.belongsTo(Command);
Company.hasOne(Invoice);
Invoice.belongsTo(Company);


// User Roles
User.belongsToMany(Role, { through: UserRole});
Role.belongsToMany(User, { through: UserRole});

Course.belongsToMany(Category, { through: 'cour_category'});
Category.belongsToMany(Course, { through: 'cour_category'});

// Command
User.hasOne(Command);
Command.belongsTo(User);




  
const initDb = () => {
  
  return sequelizeDb.sync().then(_ => {
    
    
    console.log('La base de donn??e a bien ??t?? initialis??e !')
  })
}
  
module.exports = { 
  initDb, User, Category, Course, Video, Role, UserRole, Company, Invoice, Command_line, Command, sequelizeDb
}