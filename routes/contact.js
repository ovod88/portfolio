const nodemailer = require("nodemailer"),
      config = require('../config/mail');


var smtpTransport = nodemailer.createTransport({
    service : "gmail",
    auth    : {
            type         : 'OAuth2',
            user         : config.user,
            clientId     : config.clientId,
            clientSecret : config.clientSecret,
            refreshToken : config.refreshToken
    }
});

exports.get = (req, res) => {

    res.render('contact', {
        styles : require('./getFiles')('css/contact')
    });

};

exports.post = (req, res) => {

    let mailOptions = {
        from    : "upworkem@gmail.com",
        to      : "upworkem@gmail.com",
        subject : "Email from portfolio site",
        text    : `Somebody wrote me with name ${req.body.client_name}, email ${req.body.client_email}
                  and message ${req.body.client_msg}`,
        html    : `<p>Somebody wrote me from my portfolio site</p><ul><li>Name: ${req.body.client_name}
                   </li><li>Email: ${req.body.client_email}</li><li>Message: ${req.body.client_msg}</li></ul>`
    }

    smtpTransport.sendMail(mailOptions,
        function (error, response) {

            if (error) {

                res.status(500).send('Service is unavailable. Try later please');

            } else {

                res.send('Message is successfully sent.');
            }

        });

    smtpTransport.close();

};