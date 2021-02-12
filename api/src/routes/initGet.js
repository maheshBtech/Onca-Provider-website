var express = require('express');
var router = express.Router();
const initGetBL = require('../core/BL/initGetBL')

const initgetbl = new initGetBL()

// get Activities
router.get('/getActivity', async function (req, res, next) {
    let result
    try{
        result = await initgetbl.getActivityBL()
        console.log(result)
        res.send(result)
    }
    catch(err){
        console.log("error route")
        throw err
    }
  });

  router.get('/getActivityType', async function (req, res, next) {
    let result
    try{
        result = await initgetbl.getActivityTypeBL()
        console.log(result)
        res.send(result)
    }
    catch(err){
        console.log("error route")
        throw err
    }
  });

  router.get('/getTopProvider', async function (req, res, next) {
    let result
    try{
        result = await initgetbl.getTopProviderBL()
        console.log(result)
        res.send(result)
    }
    catch(err){
        console.log("error route")
        throw err
    }
  });
  router.get('/getActivitybyID', async function (req, res, next) {
    let result
    let ID=req.body.ID
    console.log(ID)
    try{
        result = await initgetbl.getActivityBLbyID(ID)
        console.log(result)
        res.send(result)
    }
    catch(err){
        console.log("error route")
        throw err
    }
  });
  router.get('/getProviderbyID', async function (req, res, next) {
    let result
    let ID=req.body.ID
    try{
        result = await initgetbl.getProviderBLbyID(ID)
        console.log(result)
        res.send(result)
    }
    catch(err){
        console.log("error route")
        throw err
    }
  });
  router.get('/getCities', async function (req, res, next) {
    let result
    
    try{
        result = await initgetbl.getCitiesBL()
        console.log(result)
        res.send(result)
    }
    catch(err){
        console.log("error route")
        throw err
    }
  });
  router.get('/getShopCategory', async function (req, res, next) {
    let result
   
    try{
        result = await initgetbl.getShopCategoryBL()
        console.log(result)
        res.send(result)
    }
    catch(err){
        console.log("error route")
        throw err
    }
  });
  router.get('/getShopProducts', async function (req, res, next) {
    let result
   
    try{
        result = await initgetbl.getShopProductsBL()
        console.log(result)
        res.send(result)
    }
    catch(err){
        console.log("error route")
        throw err
    }
  });

  router.post('/postShoppingcart', async function (req, res, next) {
        const msgObject = {
        UserID: req.body.UserID,
        ProductID: req.body.ProductID,
        ActivityItemID: req.body.ActivityItemID,
        Quantity: req.body.Quantity,
        Productflag:req.body.Productflag, 
        Message: req.body.Message
      }
    try{
        let message
        message =  await initgetbl.postShoppingcartBL(msgObject)
        message.message = "SUCCESS"
        res.send(message)
    }
    catch(err){
        console.log("error route")
        throw err
    }
  });

  router.post('/getShoppingcart', async function (req, res, next) {
    let result
    const msgObject = {
      UserID: req.body.UserID,
     }
     console.log(msgObject)
   
    try{
        result = await initgetbl.getShoppingcartBL(msgObject)
        console.log(result)
        res.send(result)
    }
    catch(err){
        console.log("error route")
        throw err
    }
  });
  
  router.post('/deleteShoppingcart', async function (req, res, next) {
    const msgObject = {
    UserID: req.body.UserID,
    ShoppingCartID: req.body.ShoppingCartID,
   
  }
try{
    let message
    message =  await initgetbl.DeleteActivityShoppingcartBL(msgObject)
    message.message = "SUCCESS"
    res.send(message)
}
catch(err){
    console.log("error route")
    throw err
}
});


module.exports = router;
