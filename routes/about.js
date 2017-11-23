module.exports = (req, res) => {

    require('./getFiles')('css/about', function(err, data) {
        res.render('about', {
            styles : data
        });
    });

};