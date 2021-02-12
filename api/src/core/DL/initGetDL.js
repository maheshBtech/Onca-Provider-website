const DataBase = require('../../loaders/db')

const database = new DataBase();

module.exports = class initGetDL {

    constructor() { }

    async getActivityDL() {
        let conn;

        try {
            var query =  "call usp_Activity_GetList";
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

    async getActivityTypeDL() {
        let conn;

        try {
            console.log()
            conn = await database.runQuery("select * from lkp_Activity_Type");
            return conn;
        }
        catch (err) {
            console.log("error")
            throw err
        }
        finally {

        }
    }

    async getTopProviderDL() {
        let conn;

        try {
            var query =  "call usp_Service_Provider_GetList";
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
    async getActivityDLbyID(ID) {
        let conn;

        try {
            var query =  "call usp_Activity_GetData('"+ID+"' )";
         
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
    async getProviderDLbyID(ID) {
        let conn;

        try {
            var query =  "call usp_Service_Provider_Details_GetData('"+ID+"' )";
         
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
    async getCitiesDL() {
        let conn;

        try {
         
            conn = await database.runQuery("SELECT * FROM lkp_City");
           // conn = await database.runQuery("call usp_get_dropdownvalues");  
            return conn;
        }
        catch (err) {
            console.log("error final")
            throw err
        }
        finally {

        }
    }
    async getShopCategoryDL() {
        let conn;

        try {
            var query =  "call usp_ProductCategory_GetList";
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
    async getShopProductsDL() {
        let conn;

        try {
            var query =  "call usp_Product_GetList";
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
    async postShoppingcartDL(msgObject) {
        let conn;

        try {
           
             var query =  "call usp_ShoppingCart_InsertUpdate("+ null +"," +msgObject.UserID+","+ msgObject.ProductID +"," +msgObject.ActivityItemID +"," +msgObject.Quantity +"," +msgObject.Productflag +")";
              console.log(query);
              console.log("query");
                          
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
    async getShoppingcartDL(msgObject) {
        let conn;

        try {
           
            var query = "call usp_ShoppingCart_GetDetails("+ msgObject.UserID + ")";
            console.log(query);
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
    async DeleteActivityShoppingcartDL(msgObject) {
        let conn;

        try {
           
            var query = "call usp_ShoppingCart_RemoveItem("+ msgObject.ShoppingCartID + "," + msgObject.UserID + ")";
            console.log(query);
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

