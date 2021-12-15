var config = require("./config.js");
var _ = require('lodash');
var localInit = function (grunt, repositoryname) {
    if (repositoryname === "")
        throw "you have not set repositoryname for servicesLocal.localInit function";

    var localWeblatePath = grunt.file.isDir(config.localWeblatePath);
    if (!localWeblatePath)
        throw "votre path config.localWeblatePath=" + config.localWeblatePath + " veilez corrigée votre config.localWeblatePath";

    var existDir = grunt.file.isDir(config.localWeblatePath + '\\' + repositoryname);
    if (existDir) {
        var existDirLocales = grunt.file.isDir(config.localWeblatePath + '\\' + repositoryname + '\\locales');
        var existREADMEfile = grunt.file.exists(config.localWeblatePath + '\\' + repositoryname + '\\README.md');
        if (existDirLocales && existREADMEfile) {
            return [
                'echo  locales et README.md existe dejat ',
                'echo rien a faire'
            ].join('&&');
        }
        if (existDirLocales) {
            return [
                'echo  ' + repositoryname + ' existe dejat ',
                'cd ' + config.localWeblatePath + '\\' + repositoryname,
                'echo accer au repertoire ' + config.localWeblatePath + '\\' + repositoryname + ' reussi',
                'echo locales existe dejat ',
                'type nul > ./README.md',
                'echo creation du fichier ./README.md reussi'
            ].join('&&');
        }
        if (existREADMEfile) {
            return [
                'echo  ' + repositoryname + ' existe dejat ',
                'cd ' + config.localWeblatePath + '\\' + repositoryname,
                'echo Accer au repertoire ' + config.localWeblatePath + '\\' + repositoryname + ' reussi',
                'echo README.md existe dejat ',
                'mkdir locales',
                'echo Creation du repertoire locales reussi'
            ].join('&&');
        }
        return [
            'echo  ' + repositoryname + ' existe dejat ',
            'cd ' + config.localWeblatePath + '\\' + repositoryname,
            'echo accer au repertoire ' + config.localWeblatePath + '\\' + repositoryname + ' reussi',
            'type nul > ./README.md',
            'echo creation du fichier ./README.md reussi',
            'mkdir locales',
            'echo creation du repertoire locales reussi'
        ].join('&&');
    }
    return [
        'cd ' + config.localWeblatePath,
        'echo accer au repertoire ' + config.localWeblatePath + ' reussi',
        'mkdir ' + repositoryname,
        'echo creation du repertoire ' + repositoryname + ' reussi',
        'cd ' + repositoryname,
        'echo accer au repertoire ' + config.localWeblatePath + '\\' + repositoryname + ' reussi',
        'type nul > ./README.md',
        'echo creation du fichier ./README.md reussi',
        'mkdir locales',
        'echo creation du repertoire locales reussi'
    ].join('&&');
};

var create_local_lng_folder = function (grunt, repositoryname, lngs) {
    if (repositoryname === "")
        throw "you have not set repositoryname for servicesLocal.localInit function";
    var localWeblatePath = grunt.file.isDir(config.localWeblatePath);
    if (!localWeblatePath)
        throw 'votre path config.localWeblatePath=' + config.localWeblatePath + '\\' + repositoryname + '\\locales \n lancée d\'abort grunt shell:localInit --repositoryname=votre repertoire';
    lngs = JSON.parse(lngs);
    var resultat = ['cd ' + config.localWeblatePath + '\\' + repositoryname + '\\locales'];
    if (!lngs.length)
        resultat = resultat.concat([
            'echo aucun langue n\'est saisie dans votre parametre'
        ]);
    resultat = resultat.concat(lngs.map(function (lng) {
            return 'mkdir ' + lng;
        })
    );
    return resultat.join('&&');
};
var create_local_lng_file = function (grunt, repositoryname, lngs) {
    if (repositoryname === "")
        throw "echo you have not set repositoryname for servicesLocal.create_local_lng_file function";
    var localWeblatePath = grunt.file.isDir(config.localWeblatePath);
    if (!localWeblatePath)
        throw 'votre path config.localWeblatePath=' + config.localWeblatePath + '\\' + repositoryname + '\\locales \n lancée dabort grunt shell:localInit --repositoryname=votre repertoire';
    var resultat = ['cd ' + config.localWeblatePath + '\\' + repositoryname + '\\locales'];
    lngs = JSON.parse(lngs);
    if (!lngs.length)
        resultat = resultat.concat([
            'echo aucun langue n\'est saisie dans votre parametre'
        ]);
    resultat = resultat.concat(lngs.map(function (lng) {
            return 'echo {} > ./' + lng + '/__TEMPLATE__.json';
        })
    );
    return resultat.join('&&');
    /*return [
        'cd ' + config.localWeblatePath + '\\' + repositoryname + '\\locales',
        'echo {} > ./fr/__TEMPLATE__.json',
        'echo {} > ./en/__TEMPLATE__.json'
    ].join('&&');*/
};
module.exports = {
    localInit: localInit,
    create_local_lng_folder: create_local_lng_folder,
    create_local_lng_file: create_local_lng_file
};