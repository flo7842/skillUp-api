const { Sequelize, DataTypes, model } = require('sequelize')
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
  
const sequelize = new Sequelize('skillUp', 'root', '', {
  host: 'localhost',
  dialect: 'mariadb',
  dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})

const User = UserModel(sequelize, DataTypes)
const Category = CategoryModel(sequelize, DataTypes)
const Course = CourseModel(sequelize, DataTypes)
const Video = VideoModel(sequelize, DataTypes)
const Role = RoleModel(sequelize, DataTypes)
const UserRole = USERROLEModel(sequelize, DataTypes)
const Company = CompanyModel(sequelize, DataTypes)
const Invoice = InvoiceModel(sequelize, DataTypes)
const Command = CommandModel(sequelize, DataTypes)
const Command_line = Command_lineModel(sequelize, DataTypes)

Command.hasOne(Command_line);
Command_line.belongsTo(Command);
Course.hasOne(Command_line);
Command_line.belongsTo(Course);

Company.hasOne(Invoice);
Invoice.belongsTo(Company);

Course.hasOne(Video);
Video.belongsTo(Course);

User.hasOne(Course);
Course.belongsTo(User);

// Invoice
User.hasOne(Invoice);
Invoice.belongsTo(User);
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
  
  // return sequelize.sync({force: true}).then(_ => {
    
    
  //   console.log('La base de donnée a bien été initialisée !')
  // })
}
  
module.exports = { 
  initDb, User, Category, Course, Video, Role, UserRole, Company, Invoice, Command_line, Command
}