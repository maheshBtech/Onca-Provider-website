const database = require("../../../loaders/db");
const dbConnection = new database();
class RegistrationDL {
    constructor() {

    }

    async userRegister(data) {
        try {
            let { email, number, password, user_ID } = data;
            let querry = `call usp_User_InsertUpdateData(${user_ID},'${number}','${email}','${password}')`
            const result = await dbConnection.runQuery(querry);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    async userLogin(data) {
        try {
            let { emailOrNumber, password,OTP } = data;
            let querry;
            if(password == "" || password == undefined || password == null)
            {
                querry = `call  usp_User_GetUserDetails('${emailOrNumber}',NULL,${OTP})`;
            }
            else if( OTP == "" || OTP == undefined || OTP == null)
            {
                 querry = `call  usp_User_GetUserDetails('${emailOrNumber}','${password}',NULL)`;
            }
            const result = await dbConnection.runQuery(querry);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
}

module.exports = RegistrationDL;