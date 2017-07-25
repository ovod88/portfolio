const dir = 'public/',
      relativeFontDir = 'css/fonts',
      fs = require('fs');

function getFiles(dir, filesExt) {

    filesExt = filesExt || [];
    let files = [];
    try {

        files = fs.readdirSync(dir);

    } catch (error) {

    }
    for(let i in files) {

        let name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()) {

            getFiles(name, filesExt);

        } else {

            let arrpath = name.split('/');
            arrpath.shift();
            name = arrpath.join('/');
            if (name.indexOf('style') != -1) {

                filesExt.customStyle = name;
                return filesExt;

            }
            filesExt.push(name);

        }

    }
    return filesExt;

}

module.exports = function (relativeStyleDir) {

    let styles = getFiles(dir + relativeStyleDir),
    fonts = getFiles(dir + relativeFontDir),
    files;

    files = [ ...styles, ...fonts ];
    files.customStyle = styles.customStyle;

    return files;

}