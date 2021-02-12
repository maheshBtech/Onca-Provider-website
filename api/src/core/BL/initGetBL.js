//const pool = require('../../services/dbConn')
const initGetDL = require('../DL/initGetDL')
const {promisify} = require('util')

var initgetdl = new initGetDL()

module.exports = class initGetBL {
    
    constructor(){
    }
    
    async getActivityBL(){
        let result;
        try{
            result = await initgetdl.getActivityDL()
            console.log("result BL")
           return result
        }
        catch(err){
            console.log("error BL")
            throw err
        }
    }

    async getActivityTypeBL(){
        let result;
        try{
            result = await initgetdl.getActivityTypeDL()
            console.log("result BL")
           return result
        }
        catch(err){
            console.log("error BL")
            throw err
        }
    }

    async getTopProviderBL(){
        let result;
        try{
            result = await initgetdl.getTopProviderDL()
            console.log("result BL")
           return result
        }
        catch(err){
            console.log("error BL")
            throw err
        }
    }
    async getActivityBLbyID(ID){
        let result;
        
        try{
            result = await initgetdl.getActivityDLbyID(ID)
            console.log("result BL")
           return result
        }
        catch(err){
            console.log(ID)
            console.log("error BL")
            throw err
        }
    }
    async getProviderBLbyID(ID){
        let result;
        
        try{
            result = await initgetdl.getProviderDLbyID(ID)
            console.log("result BL")
           return result
        }
        catch(err){
            console.log(ID)
            console.log("error BL")
            throw err
        }
    }
    async getCitiesBL(){
        let result;
        try{
            result = await initgetdl.getCitiesDL()
            console.log("result BL")
           return result
        }
        catch(err){
            console.log("error BL")
            throw err
        }
    }
    async getShopCategoryBL(){
       
        let result;
        try{
            result = await initgetdl.getShopCategoryDL()
            console.log("result BL")
           return result
        }
        catch(err){
            console.log("error BL")
            throw err
        }
    }
    async getShopProductsBL(){
        let result;
        try{
            result = await initgetdl.getShopProductsDL()
            console.log("result BL")
           return result
        }
        catch(err){
            console.log("error BL")
            throw err
        }
    }
    async postShoppingcartBL(msgObject){
        let result;
        
        try{
            result = await initgetdl.postShoppingcartDL(msgObject)
            console.log("result BL")
           return result
        }
        catch(err){
            console.log(msgObject)
            console.log("error BL")
            throw err
        }
    }
    async getShoppingcartBL(msgObject){
        let result;
        
        try{
            result = await initgetdl.getShoppingcartDL(msgObject)
            console.log("result BL")
           return result
        }
        catch(err){
            console.log(msgObject)
            console.log("error BL")
            throw err
        }
    }

    async DeleteActivityShoppingcartBL(msgObject){
        let result;
        
        try{
            result = await initgetdl.DeleteActivityShoppingcartDL(msgObject)
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

