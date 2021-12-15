var config = require("./config.js");
var _ = require('lodash');

var create_gitea_repository = function (repositoryname) {
    var curlString = 'curl -X POST "' + config.giteaHost + '/api/v1/user/repos" ' + config.header +
        '-d "{ ' +
        '   \\"name\\": \\"' + repositoryname + '\\", ' +
        '   \\"private\\": true,' +
        '   \\"readme\\": \\"Default\\"' +
        '} "';
    return curlString;
};
var add_gitea_key_repository = function (grunt, userrepository, repositoryname) {
    var sshFilescontent = grunt.file.expand({cwd: config.pathSSH}, ["*.pub"]).map(function (file) {
        return grunt.file.read(config.pathSSH + "\\" + file)
    });
    var curl_ssh = sshFilescontent.map(function (ssh) {
        var arraysshkeys = ssh.split(" ") || '';
        var titlesshkeys = arraysshkeys[arraysshkeys.length - 1];
        return 'curl -X POST "' + config.giteaHost + '/api/v1/repos/' + userrepository + '/' + repositoryname + '/keys" ' + config.header +
            '-d "{' +
            '  \\"key\\": \\"' + ssh.replace(/(\r\n|\n|\r)/gm, "") + '\\",' +
            '  \\"read_only\\": false,' +
            '  \\"title\\": \\"' + titlesshkeys.replace(/(\r\n|\n|\r)/gm, "") + '\\"' +
            '}"'
    });
    return curl_ssh.join('&&');
};

var add_gitea_hook_repository = function (userrepository, repositoryname, hooks) {
    if (hooks === "")
        return ["echo add_gitea_hook_repository "].join('&&')
    var curlHook = JSON.parse(hooks).map(function (hook) {
        return 'curl -X POST "' + config.giteaHost + '/api/v1/repos/' + userrepository + '/' + repositoryname + '/hooks" ' + config.header +
            '-d "{' +
            '   \\"active\\": true,' +
            '   \\"branch_filter\\": \\"*\\",' +
            '   \\"config\\":{' +
            '       \\"content_type\\": \\"' + hook.content_type + '\\",' +
            '       \\"url\\": \\"' + hook.hookUrl + '\\",' +
            '       \\"http_method\\": \\"' + hook.http_method + '\\"' +
            '   },' +
            '\\"events\\": [' +
            '    \\"push\\"' +
            '  ],' +
            '\\"type\\": \\"gitea\\"}"'
    });
    return curlHook.join('&&');
};
var init_local_repository_git = function (grunt, repositoryname, lngs) {
    if (repositoryname === "")
        return "echo you have not set repositoryname for servicesLocal.localInit function";
    var resultat = [
        'cd ' + config.localWeblatePath + '\\' + repositoryname,
        'git init',
        'git add README.md',
        'git remote add origin ' + config.sshDuRepositoryGitea + '/' + repositoryname + '.git',
        'git commit -m "Initialisation du repository avec le commit du fichier README"',
        'git push -u origin master'
    ];
    lngs = JSON.parse(lngs);
    if (!lngs.length)
        resultat = resultat.concat([
            'echo aucun langue n\'est saisie dans votre parametre'
        ]);
    var resLng = [];
    resLng = resLng.concat(lngs.map(function (lng) {
        return [
            'git branch ' + lng,
            'git checkout ' + lng,
            'git add ./locales/' + lng + '/__TEMPLATE__.json',
            'git commit -m "Ajout des fichiers des entités"',
            'git push origin ' + lng
        ]
    }));
    resLng.forEach(function (res) {
        resultat = resultat.concat(res);
    });
    return resultat.join('&&');

};
var clone_repository_git_to_local = function (grunt, repositoryname, lng) {
    if (repositoryname === "")
        return "echo you have not set repositoryname for servicesLocal.localInit function";
    var resultat = [
		'cd ' + config.localWeblatePath ,
        'mkdir '+lng,
        'cd '+lng,
        'git clone ' + config.sshDuRepositoryGitea + '/' + repositoryname + '.git',
        'cd '+repositoryname,
        'git checkout ' + lng,
        'git pull origin ' + lng,
		'git status '
    ];
    return resultat.join('&&');

};
var demande_rajout_local_repository_git = function (grunt, repositoryname, lng) {
    if (repositoryname === "")
        return "echo you have not set repositoryname for servicesLocal.localInit function";
    var resultat = [
		'cd ' + config.localWeblatePath+'\\'+lng+'\\'+repositoryname ,
        'git checkout ' + lng,
        'git pull origin ' + lng,
		'git status '
    ];
    return resultat.join('&&');

};
var add_local_repository_git = function (grunt, repositoryname, lng) {
    if (repositoryname === "")
        return "echo you have not set repositoryname for servicesLocal.localInit function";
    var resultat = [
        'cd ' + config.localWeblatePath+'\\'+lng+'\\'+repositoryname ,
		'git checkout ' + lng,
		'git pull ',
		'git add .',
		'git commit -m "Ajout dans la langue'+lng+'"',
		'git push origin ' + lng,
		'cd ' + config.localWeblatePath,
		//'rmdir /Q /S ' + repositoryname+'_'+lng
    ];
    return resultat.join('&&');

};
module.exports = {
    create_gitea_repository: create_gitea_repository,
    add_gitea_key_repository: add_gitea_key_repository,
    add_gitea_hook_repository: add_gitea_hook_repository,
    init_local_repository_git: init_local_repository_git,
    clone_repository_git_to_local: clone_repository_git_to_local,
    demande_rajout_local_repository_git: demande_rajout_local_repository_git,
    add_local_repository_git: add_local_repository_git
};