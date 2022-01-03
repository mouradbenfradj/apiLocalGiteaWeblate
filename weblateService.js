var config = require("./config.js");
var _ = require('lodash');
var create_weblate_repository = function (repositoryname, webSiteProject) {
    var curlString = "curl -X " +
        "POST " + config.weblateHost + "/projects/ " +
        "-H \"Authorization: Token " + config.weblateToken + "\" " +
        "-d name=" + repositoryname + " " +
        "-d slug=" + repositoryname.toLowerCase() + " " +
        "-d web=" + webSiteProject + " " +
        "-d translation_review=true " +
        "-d source_review=true " +
        "-d set_language_team=true " +
        "-d enable_hooks=true";
    return curlString;
};
var create_weblate_component = function (userrepository, repositoryname, lngs) {
    var configWeblate = JSON.parse(lngs);
    var culrArray = _.map(configWeblate.lng, function (lng) {
        var curlString = 'curl ' +
            ' -H "Authorization: Token ' + config.weblateToken + '" ' +
            ' -d name="__TEMPLATE__' + lng + '"' +
            ' -d slug="__template__' + lng + '"' +
            ' -d source_language.code="' + lng + '"' +
            ' -d vcs="git"' +
            ' -d edit_template=true' +
            ' -d restricted=true' +
            ' -d repo="' + configWeblate.repo + '"' +
            ' -d branch="' + lng + '"' +
            ' -d push_branch="' + lng + '"' +
            ' -d filemask="locales/*/__TEMPLATE__.json"' +
            ' -d template="locales/' + lng + '/__TEMPLATE__.json"' +
            ' -d file_format="i18next"' +
            ' -d allow_translation_propagation=true' +
            ' -d enable_suggestions=true' +
            ' -d push_on_commit=true' +
            ' -d commit_pending_age=0' +
            ' -d auto_lock_error=true' +
            ' -d push="' + configWeblate.repo + '"' +
            ' -d enforced_checks=[]' +
            ' -d repoweb="http://172.16.10.1:3000/' + userrepository + '/' + repositoryname + '/src/branch/{{branch}}/{{filename}}#L{{line}}"' +
            ' -d language_regex="' + (config.language_regex.includes(lng + "|") ? config.language_regex.replace(lng + "|", "") : config.language_regex.replace("|" + lng, "")) + '"' +
            ' -X POST ' + config.weblateHost + '/projects/' + repositoryname.toLowerCase() + '/components/';
        return curlString;
    });
    return culrArray.join('&&');
};
var create_weblate_greffon = function (repositoryname, lngs) {
    var configWeblate = JSON.parse(lngs);
    var curlString;
    var culrDiscoveryArray = _.map(configWeblate.lng, function (lng) {

      
            
        curlString = 'curl -X POST -H "Content-Type: application/json" ' +
            '-H "Authorization: Token ' + config.weblateToken + '" ' +
            '-k -d "{' +
            '\\"name\\":\\"weblate.discovery.discovery\\",' +
            '\\"configuration\\":{' +
            '\\"match\\":\\"' + config.expression_Rationnelle[3] + '\\",' +
            '\\"file_format\\":\\"i18next\\",' +
            '\\"name_template\\":\\"{{ component }}_' + lng + '\\",' +
            '\\"base_file_template\\":\\"locales/' + lng + '/{{component}}.json\\",' +
            '\\"new_base_template\\":\\"locales/' + lng + '/{{component}}.json\\",' +
            '\\"language_regex\\":\\"^^[^^.]+$\\",' +
            '\\"copy_addons\\":true,' +
            '\\"remove\\":false,' +
            '\\"confirm\\":true,' +
            '\\"preview\\":true},' +
            '\\"url\\":\\"\\"' +
            '}" ' +
            config.weblateHost + '/components/' + repositoryname.toLowerCase() + '/__template__' + lng.toLowerCase() + '/addons/'; 

        return curlString;
    });

    //--repositoryname=adocETL_MBF_FR --weblateconfig="\"{\\"lng\\":[\\"fr\\",\\"en\\"],\\"repo\\":\\"mourad.benfradj@172.16.10.1:mourad/adocETL_MBF_FR.git\\"}\""
    var culrAutotranslateArray = _.map(configWeblate.lng, function (lng) {
        curlString = 'curl ' +
            ' -H "Authorization: Token ' + config.weblateToken + '" ' +
            ' -X POST ' + config.weblateHost + '/components/' + repositoryname.toLowerCase() + '/__template__' + lng.toLowerCase() + '/addons/' +
            ' -d name="weblate.autotranslate.autotranslate"' +
            ' -d configuration="{   ' +
            '\\"mode\\":\\"suggest\\",   ' +
            '\\"filter_type\\":\\"todo\\",   ' +
            '\\"auto_source\\":\\"mt\\",   ' +
            '\\"component\\":\\"\\",   ' +
            '\\"engines\\":[\\"weblate\\"],   ' +
            '\\"threshold\\":80' +
            '}"';
        return curlString;
    });
    var culrArray = culrDiscoveryArray.concat(culrAutotranslateArray);
    return culrArray.join('&&');
}
module.exports = {
    create_weblate_repository: create_weblate_repository,
    create_weblate_component: create_weblate_component,
    create_weblate_greffon: create_weblate_greffon
};