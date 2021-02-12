//const pool = require('../../services/dbConn')
const loginDL = require('../DL/loginDL')
const {promisify} = require('util')

var logindl = new loginDL()

module.exports = class loginBL {
    
    constructor(){
    }
    
    async joinInstentlyBL(msgObject){
        let result;
        try{
            result = await logindl.joinInstentlyDL(msgObject)
            console.log("result BL")
           return result
        }
        catch(err){
            console.log("error BL")
            throw err
        }
    }

    async loginUserBL(msgObject){
        let result;
        try{
            result = await logindl.loginUserDL(msgObject)
            console.log("result BL")
           return result
        }
        catch(err){
            console.log("error BL")
            throw err
        }
    }

}