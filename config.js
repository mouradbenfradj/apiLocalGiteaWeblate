var hostIP = ["localhost", "127.0.0.1", "172.16.10.1"];//rajouter votre ip
var ipindex = 1;//ip a utilisé ici 2 pour 172.16.10.1
var portGitea = 3000;//port de votre gitea

var weblateHost = 'http://' + hostIP[ipindex] + '/api';
var giteaHost = 'http://' + hostIP[ipindex] + ':' + portGitea;
//repertoire ou ce situe les repository local ou vous crée les depo a synchrnoisé avec gitea
var localWeblatePath = "C:\\home\\logiciels\\AtlasInsurancePlace\\weblate\\locales";//a modifier
//path de votre repertoire ssh
var pathSSH = "C:\\Users\\mourad.benfradj\\.ssh";//a modifier

var giteaToken = '312b0101e8b029cfa2224de6cd6f22a9549c9d01';
var weblateToken = 'gSgpkGSyE3usc30xBbQTFPTLS3v20naOvsgjRJsp';
//var weblateToken = 'px5G9HTOzsUc4D2fc99iqKG19D89ar1xCEjhkB3C';

var sshDuRepositoryGitea = 'mourad.benfradj@' + hostIP[0] + ':mourad';//a modifier

var header = '-H  "accept: application/json" -H  "Authorization: token ' + giteaToken + '" -H  "Content-Type: application/json" ';//ne pas modifier
var language_regex = "^(en|ar|es|de|fr)$";//peux etre modifie
var expression_Rationnelle = [
    "locales/(?P^<language^>[^^/]*)/(?P^<component^>(?!__TEMPLATE__)([^^/])*)\\\\.json",//ce qu'ont utilise
    "(?P<language>[^/.]*)/(?P<component>[^/]*)\\.po",
    "locale/(?P<language>[^/.]*)/LC_MESSAGES/(?P<component>[^/]*)\\.po",
    "src/locale/(?P<component>[^/]*)\\.(?P<language>[^/.]*)\\.po",
    "locale/(?P<language>[^/.]*)/(?P<component>[^/]*)/(?P=language)\\.po",
    "res/values-(?P<language>[^/.]*)/strings-(?P<component>[^/]*)\\.xml"
];

module.exports = {
    weblateHost: weblateHost,//weblateHost = host sur lequel en envoie les api
    weblateToken: weblateToken,//weblateToken = le token de l'utilisateur pour le head des requette curl//on peux utilisé -u username:password a la place des token mais pour le moment
    giteaHost: giteaHost,//giteaHost= host d'envoie des api gitea
    sshDuRepositoryGitea: sshDuRepositoryGitea,//giteaHost= host d'envoie des api gitea
    giteaToken: giteaToken,//giteaToken= de l'utilisateur gitea
    pathSSH: pathSSH,//path de votre repertoire ssh
    header: header,//gitea header
    localWeblatePath: localWeblatePath,//repertoire des fichier de base des project gitea
    language_regex: language_regex,//regex pour weblat greffon
    expression_Rationnelle: expression_Rationnelle//expression_Rationnelle= les expression accepter par weblate a utulisé par le greffon decouverte des composant
};
