let indexStyles;

require('./getFiles')('css/index', function (err, data) {

    if (err) {

        indexStyles = [];

    }
    indexStyles = data;

});

exports.get = (req, res) => {

        res.render('index', {
            styles : indexStyles
        });

};