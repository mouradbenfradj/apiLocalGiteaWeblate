#note bien:
viellez adapté le fichier config.js par les parametre qui convient votre configuration


#execution
grunt commande --option [--option ...]

#liste des commande:
#######initialisation du repertoire local avec readme.md a vide et le repertoires locales a vide
shell:localInit 

#####creation des repertoire de langue "option lngs" dans repertoires locales
shell:create_local_lng_folder

#####creation des fichier templates '__template__" a contenu objet vide "{}" dans les repertoires langues "option lngs" situé au repertoires locales
shell:create_local_lng_file

#####creation du repertoire gitea
shell:create_gitea_repository

#####ajout des clé ssh sur le post de travaille au depot gitea 
shell:add_gitea_key_repository
#####ajout des hooks passé en option hooks
shell:add_gitea_hook_repository

#####initilisation du depo local avec le depot gitea et push les donnée local sur le depo gitea
shell:init_local_repository_git

#####initialisation du depo weblate
shell:create_weblate_repository

#####creation des component weblate a partie du depo gitea
shell:create_weblate_component

#####ajout des greffons decouverte des composant et traduction automatique au composant weblate 
shell:create_weblate_greffon

#option:
#####definit l'utilisateur gitea ou weblate choisie 
#####pour utilisation avec la commande grunt tous court il faux que grunt et weblate est le meme utilisateur
#####exemple userrepository=mourad
userrepository

#####le nom du depo local , gitea ou weblate
#####exemple --repositoryname=adocETL_mourad_AR
repositoryname

#####la liste des langues a crée sur le repo local ou a parcourir sur gitea ou les depot pour les push  
#####exemple
#####format cmd
#####--lngs="[\"en\",\"fr\"]"  
#####format webstorm
#####--lngs="[\\"en\\",\\"fr\\"]"
lngs

#####tableau des hooks a crée par gitea 
#####exemple
#####format cmd --hooks="[{\"hookUrl\":\"http://172.16.10.1:8093/v1/i18n/import\",\"http_method\":\"post\",\"content_type\":\"json\"},{\"hookUrl\":\"https://aip.adoc/hooks/gitea/\",\"http_method\":\"post\",\"content_type\":\"form\"}]"
#####format webstorm --hooks="\"[{\\"hookUrl\\":\\"http://172.16.10.1:8093/v1/i18n/import\\",\\"http_method\\":\\"post\\",\\"content_type\\":\\"json\\"},{\\"hookUrl\\":\\"https://aip.adoc/hooks/gitea/\\",\\"http_method\\":\\"post\\",\\"content_type\\":\\"form\\"}]\""
hooks

webSiteProject


#exemple
#####commande qui lance tous les commandes au meme temps  
######cmd
grunt  --userrepository=mourad --repositoryname=adocETL_mourad_AR --lngs="[\"en\",\"fr\"]" --hooks="[{\"hookUrl\":\"http://172.16.10.1:8093/v1/i18n/import\",\"http_method\":\"post\",\"content_type\":\"json\"},{\"hookUrl\":\"https://aip.adoc/hooks/gitea/\",\"http_method\":\"post\",\"content_type\":\"form\"}]" --webSiteProject=https://aip.dev:2020
######webstorm runner
######--userrepository=mourad --repositoryname=adocETL_mourad_AR --lngs=[\\"fr\\",\\"en\\"] --hooks="\"[{\\"hookUrl\\":\\"http://172.16.10.1:8093/v1/i18n/import\\",\\"http_method\\":\\"post\\",\\"content_type\\":\\"json\\"},{\\"hookUrl\\":\\"https://aip.adoc/hooks/gitea/\\",\\"http_method\\":\\"post\\",\\"content_type\\":\\"form\\"}]\"" --webSiteProject=https://aip.dev:2020


#####initialisation du repertoire local avec readmefile et le repertoires locales
grunt shell:localInit --repositoryname=adocETL_mourad_AR

#####creation des repertoire de langue "lngs" dans repertoires locales
#####cmd
grunt shell:create_local_lng_folder --repositoryname=adocETL_mourad_AR --lngs="[\"en\",\"fr\"]"
#####webstorm runner
grunt
shell:create_local_lng_folder 
--repositoryname=adocETL_mourad_AR --lngs="[\\"en\\",\\"fr\\"]"


#####creation des fichier templates a contenu objet vide dans les repertoires langues "lngs" situé au repertoires locales
grunt shell:create_local_lng_file --repositoryname=adocETL_mourad_AR --lngs="[\"en\",\"fr\"]"

#####creation du repertoire gitea
grunt shell:create_gitea_repository --repositoryname=adocETL_mourad_AR

grunt shell:add_gitea_key_repository --repositoryname=adocETL_mourad_AR --userrepository=mourad

grunt shell:add_gitea_hook_repository  --userrepository=mourad --repositoryname=adocETL_mourad_AR --hooks="[{\"hookUrl\":\"http://172.16.10.1:8093/v1/i18n/import\",\"http_method\":\"post\",\"content_type\":\"json\"},{\"hookUrl\":\"https://aip.adoc/hooks/gitea/\",\"http_method\":\"post\",\"content_type\":\"form\"}]"

grunt shell:init_local_repository_git --repositoryname=adocETL_mourad_AR --lngs="[\"en\",\"fr\"]"


#####initialisation du weblate
grunt shell:create_weblate_repository --repositoryname=adocETL_mourad_AR --webSiteProject=https://aip.dev:2020

grunt shell:create_weblate_component --userrepository=mourad --repositoryname=adocETL_mourad_AR --lngs="[\"en\",\"fr\"]"

grunt shell:create_weblate_greffon --repositoryname=adocETL_mourad_AR --lngs="[\"en\",\"fr\"]"

