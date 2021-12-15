module.exports = function (grunt) {
    var servicesLocal = require("./localRepositoryService.js");
    var servicesGitea = require("./servicesGitea.js");
    var servicesWeblate = require("./weblateService.js");


    var repositoryname = grunt.option('repositoryname') || '';
    var lngs = grunt.option('lngs') || '[]';
    var lngString = grunt.option('lng') || '';
    var userrepository = grunt.option('userrepository') || '';
    var weblateconfig = grunt.option('weblateconfig') || '{}';
    var hooks = grunt.option('hooks') || '';
    var webSiteProject = grunt.option('webSiteProject') || '';

    function log(error, stdout, stderr, callback) {
        if (error) {
            callback(error);
            return;
        }

        console.log(stdout);
        callback();
    }

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        shell: {
            localInit: {
                command: servicesLocal.localInit(grunt, repositoryname),
                options: {
                    callback: log
                }
            },
            create_local_lng_folder: {
                command: servicesLocal.create_local_lng_folder(grunt, repositoryname, lngs),
                options: {
                    callback: log
                }
            },
            create_local_lng_file: {
                command: servicesLocal.create_local_lng_file(grunt, repositoryname, lngs),
                options: {
                    callback: log
                }
            },
            init_local_repository_git: {
                command: servicesGitea.init_local_repository_git(grunt, repositoryname, lngs),
                options: {
                    callback: log
                }
            },
            clone_repository_git_to_local: {
                command: servicesGitea.clone_repository_git_to_local(grunt, repositoryname, lngString),
                options: {
                    callback: log
                }
            },
            demande_rajout_local_repository_git: {
                command: servicesGitea.demande_rajout_local_repository_git(grunt, repositoryname, lngString),
                options: {
                    callback: log
                }
            },
            add_local_repository_git: {
                command: servicesGitea.add_local_repository_git(grunt, repositoryname, lngString),
                options: {
                    callback: log
                }
            },
            create_gitea_repository: {
                command: servicesGitea.create_gitea_repository(repositoryname),
                options: {
                    callback: log
                }
            },
            add_gitea_key_repository: {
                command: servicesGitea.add_gitea_key_repository(grunt, userrepository, repositoryname),
                options: {
                    callback: log
                }
            },
            add_gitea_hook_repository: {
                command: servicesGitea.add_gitea_hook_repository(userrepository, repositoryname, hooks),
                options: {
                    callback: log
                }
            },
            create_weblate_repository: {
                command: servicesWeblate.create_weblate_repository(repositoryname, webSiteProject),
                options: {
                    callback: log
                }
            },
            create_weblate_component: {
                command: servicesWeblate.create_weblate_component(userrepository, repositoryname, weblateconfig),
                options: {
                    callback: log
                }
            },
            create_weblate_greffon: {
                command: servicesWeblate.create_weblate_greffon(repositoryname, weblateconfig),
                options: {
                    callback: log
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('gitea_repository', [
        'shell:create_gitea_repository',
        'shell:add_gitea_key_repository',
        'shell:add_gitea_hook_repository'
    ]);

    // Default task(s).
    grunt.registerTask('default', [
        'shell:localInit',
        'shell:create_local_lng_folder',
        'shell:create_local_lng_file',
        'shell:create_gitea_repository',
        'shell:add_gitea_key_repository',
        'shell:add_gitea_hook_repository',
        'shell:init_local_repository_git',
        'shell:create_weblate_repository',
        'shell:create_weblate_component',
        'shell:create_weblate_greffon'
    ]);
};