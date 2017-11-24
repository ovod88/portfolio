const nodemailer = require("nodemailer"),
      config = require('../config/mail');
let contactStyles;

require('./getFiles')('css/contact', function (err, data) {

    if (err) {

        contactStyles = [];

    }
    contactStyles = data;

});

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

function checkEmail (value) {

    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return value.match(regExp) ? true : false;

}

exports.get = (req, res) => {

    res.render('contact', {
        styles : contactStyles
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

    if ( req.body.client_name.trim().length > 0 &&
        req.body.client_email.trim().length > 0 &&
        req.body.client_msg.trim().length > 0 &&
        checkEmail(req.body.client_email.trim())) {

        smtpTransport.sendMail(mailOptions,
            function (error, response) {

                if (error) {
                    if (req.app.get('env') === 'development') {

                        res.status(500).send(error.toString());

                    } else {

                        res.status(500).send('Service is unavailable. Try later please');

                    }

                } else {

                    res.send('Message is successfully sent.');
                }

            });

        smtpTransport.close();

    } else {

        res.status(206).send('Server failed with provided data. Resend correct data');
        res.end();

    }

};