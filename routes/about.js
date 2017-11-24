let aboutStyles;

require('./getFiles')('css/about', function (err, data) {

    if (err) {

        aboutStyles = [];

    }
    aboutStyles = data;

});

module.exports = (req, res) => {

    res.render('about', {
        styles : aboutStyles
    });

};