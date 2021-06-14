const { QueryTypes } = require('sequelize');
const { sequelizeDb } = require("./sequelize")

const queryMaker = async (type, dataSelected = [], table, join = null, condition = null, params = null, queryTypes) => {
    return await sequelizeDb.query(type + " " + dataSelected + " FROM " + table +" "+
        join + " `commands` ON `commands`.`id` = `command_lines`.`CommandId`"+
        join + " `courses` ON `courses`.`id` = `command_lines`.`CourseId`" +
        join + " `users` ON `users`.`id` = `commands`.`UserId` " +
        condition + " UserId = :id"
  ,{ replacements: { id: params }, type: queryTypes }

)}

module.exports = {
    queryMaker
}