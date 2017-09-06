module.exports = (req, res) => {

    res.render('about', {
        styles : require('./getFiles')('css/about')
    });

};