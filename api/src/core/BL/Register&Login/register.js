const RegistrationDL = require("../../DL/Register&Login/register&login")
const axios = require("axios");
var request = require("request");
class RegistrationBL {
    constructor() {
        this.registrationDL = new RegistrationDL();

    }
    async userRegister(data) {
        return await this.registrationDL.userRegister(data);
    }
    async userLogin(data) {
        return await this.registrationDL.userLogin(data);
    }




}

module.exports = RegistrationBL;