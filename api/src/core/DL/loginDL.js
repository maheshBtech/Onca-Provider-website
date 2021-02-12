const DataBase = require('../../loaders/db')

const database = new DataBase();

module.exports = class usersDL {

    constructor() { }

    async joinInstentlyDL (paramObj) {
        let conn;

        try {
            var query =  "call usp_User_InsertUpdateData('"+paramObj.UserId+"' ,'" +paramObj.TelephoneNo+"','"+paramObj.EmailID+"','" + paramObj.Password +"')";
            conn = await database.runQuery(query);
            return conn;
        }
        catch (err) {
            console.log("error")
            throw err
        }
        finally {

        }
    }

    async loginUserDL (paramObj) {
        let conn;

        try {
            var query =  "call usp_User_GetUserDetails('"+paramObj.UserName+"' ,'" + paramObj.Password +"')";
            conn = await database.runQuery(query);
            return conn;
        }
        catch (err) {
            console.log("error")
            throw err
        }
        finally {

        }
    }

}
