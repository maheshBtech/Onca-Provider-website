const router = require("express").Router();
const RegistrationBL = require("../../core/BL/Register&Login/register");
const registerBL = new RegistrationBL();

router.post("/userRegister", async (req, res) => {
    if (req.body === null) {
        return null
    }
    let data = req.body;
    let result = await registerBL.userRegister(data);
    res.send(result);

})


router.post("/userLogin", async (req, res) => {
    if (req.body === null) {
        return null
    }
    let data = req.body;
    let result = await registerBL.userLogin(data);
    res.send(result);

})

module.exports = router;