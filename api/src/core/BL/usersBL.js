//const pool = require('../../services/dbConn')
const usersDL = require('../DL/usersDL')
const {promisify} = require('util')

var usersdl = new usersDL()

module.exports = class initGetBL {
    
    constructor(){
    }
    
    async postUserQueryBL(msgObject){
        let result;
        
        try{
            result = await usersdl.postUserQueryDL(msgObject)
            console.log("result BL")
           return result
        }
        catch(err){
            console.log(msgObject)
            console.log("error BL")
            throw err
        }
    }
}