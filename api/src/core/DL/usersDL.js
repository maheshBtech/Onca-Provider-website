const DataBase = require('../../loaders/db')

const database = new DataBase();

module.exports = class usersDL {

    constructor() { }

    async postUserQueryDL(msgObject) {
        let conn;

        try {
           
             var query =  "call usp_UsersQuery_InsertData('"+msgObject.Name+"' ,'" +msgObject.Email+"','"+msgObject.Phone+"','" + msgObject.Message +"')";
              console.log(query);
                 // return;
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
