const dir = 'public/',
      relativeFontDir = 'css/fonts',
      fs = require('fs');

function getFiles (dir, files_){
    files_ = files_ || [];
    let files = [];
    try {
        files = fs.readdirSync(dir);
    } catch (error) {

    }
    
    for (let i in files){
        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            let arrpath = name.split('/');
            arrpath.shift();
            name = arrpath.join('/');
            if(name.indexOf('style') != -1) {
                files_.customStyle = name;
                return files_;
            }
            files_.push(name);
        }
    }
    return files_;
}


module.exports = function(relativeStyleDir) {
    let styles = getFiles(dir + relativeStyleDir),
    fonts = getFiles(dir + relativeFontDir),
    files;

    files = [...styles, ...fonts];
    files.customStyle = styles.customStyle;

    return files;
}