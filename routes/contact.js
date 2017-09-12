module.exports = (req, res) => {

    res.render('contact', {
        styles : require('./getFiles')('css/contact')
    });

};