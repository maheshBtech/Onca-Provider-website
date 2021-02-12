const nodemailer = require("nodemailer")
const dotenv = require('../../../dotenvSetup');
dotenv.initenv();

module.exports = function sendMail(toMail) {
        return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.WEBSITEMAILID,
                pass: process.env.WEBSITEMAILPSS
            }
        });
        var mailOptions = {
            from: process.env.WEBSITEMAILID,
            to: toMail,
            subject: 'ONCA RUN Application Link',
            text: 'ONCARUNApplicationLink'
        };
        let resp = false;

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error is " + error);
                resolve("FAIL"); // or use rejcet(false) but then you will have to handle errors
            }
            else {
                console.log('Email sent: ' + info.response);
                resolve("SUCCESS");
            }
        });
    })
}