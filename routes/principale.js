exports.get = (req, res) => {
    res.render('index', {
         styles: require('./getFiles')('css/index')
    });
}