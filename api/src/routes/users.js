//Add user related routes here
//include the auth service from services/user
var express = require('express');
var router = express.Router();
var axios = require('axios');
var requestIp = require('request-ip');
var sendMail = require('../core/BL/mailBL');
var usersBL = require('../core/BL/usersBL');
const dotenv = require('../../dotenvSetup');
dotenv.initenv();

var userbl = new usersBL()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hello This is user page');
});

router.get('/getLocationData', async function (req, res, next) {
  let clientIp = requestIp.getClientIp(req);
  let url = process.env.LOCATION_DATA_URL //'http://ip-api.com/json/';
  if (clientIp !== '::1' && clientIp !== null) {
    url = process.env.LOCATION_DATA_URL + clientIp;
  }
  let locationInfo;
  await axios.get(url).then(function (response) {
    locationInfo = response.data;
    res.send(locationInfo);
  }).catch(function (error) {
    return error
  })
});

router.post('/postUserQuery', async function (req, res) {
  const msgObject = {
    Name: req.body.Name,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Message: req.body.Message
  }
  try {
    let message
    message = await userbl.postUserQueryBL(msgObject)
    message.message = "SUCCESS"
    res.send(message)
  }
  catch (err) {
    console.log("error route")
   
    throw err
  }
})

router.post('/getLinkOn', async function (req, res) {
  console.log(req.body.GetLinkOn);
  const msgObject = {
    GetLinkOn: req.body.GetLinkOn,
    InpuType: req.body.InputType
  }

  try {
    let message = "";
    if (msgObject.InpuType === 'Email') {
      message = await sendMail(msgObject.GetLinkOn);
      res.send(message);
    }
    else if (msgObject.InpuType === 'MobileNo') { }
  }
  catch (err) {
    console.log("error route")
    throw err
  }
})

module.exports = router;