const { QueryTypes } = require('sequelize');
const { sequelizeDb } = require("./sequelize")



const queryMaker = async (type, dataSelected = [], table, fieldJoined = [], condition = null, paramsCondition = null, params = null, queryTypes) => {

    

    return await sequelizeDb.query(
        type + " " + dataSelected + 
        " FROM " + table + " "
        + fieldJoined + " " +
        condition + " " + paramsCondition
  ,{ replacements: { id: params }, type: queryTypes }

)}

module.exports = {
    queryMaker
}