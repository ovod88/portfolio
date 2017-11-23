exports.get = (req, res) => {
    
    require('./getFiles')('css/index', function(err, data) {
        res.render('index', {
            styles : data
        });
    })

}