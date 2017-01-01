
module.exports = function(gulp, plugin) {

    /*
        helper functions
    */
    function getTask(name) {
        return require('./task/' + name + '.js')( gulp, plugin, config );
    }

    function normalizeGlobs(path, globs) {
        const normalGlobs = globs.map(function(glob) {
            let normalGlob = '';

            if (glob.indexOf('!') === -1) {
                normalGlob += path + glob;
            } else {
                normalGlob += '!' + path + glob.substring(1);
            }

            return normalGlob;
        });

        return normalGlobs;
    }

    function normalizePaths(params) {
        if (params.server.type === 'express') {
            params.server.target = params.path + params.server.target;
        }
        
        params.watch.globs = normalizeGlobs(params.path, params.watch.globs);
        params.sass.outputDir = params.path + params.sass.outputDir;
        params.sass.fontsDir = params.path + params.sass.fontsDir;
        params.sass.globs = normalizeGlobs(params.path, params.sass.globs);
        params.javascript.globs = normalizeGlobs(params.path, params.javascript.globs);
        params.javascript.outputDir = params.path + params.javascript.outputDir;
        params.cachebust.globs = normalizeGlobs(params.path, params.cachebust.globs);
        params.cachebust.outputDir = params.path + params.cachebust.outputDir;
        params.dependencyManagement.path = params.path + 'bower.json';

        return params;
    }

    /*
        config object
    */
    var config = {
        load: function (params) {
            Object.assign(
                this, 
                normalizePaths(
                    (typeof params === 'string') ? JSON.parse(params) : params
                )
            );

            // hooking tasks after config is setup cause config is needed
            config.browserSync.task = getTask('browser-sync');
            config.dependencyManagement.task = getTask('vendor');
            config.javascript.task = getTask('javascript');
            config.cachebust.task = getTask('cache-bust');
            config.sass.task = getTask('sass');
            config.watch.task = getTask('watch');
        },

        browserSync: {},

        // If Gulp encounters an error it will launch a system notification
        error: {
            params: {
                title:    'Gulp',
                message:  '<%= error.message %>',
                sound: false
            },
            handler: function(err) {
                plugin.notify.onError(config.error.params)(err);

                if ( this.emit !== undefined ) this.emit('end');
            }
        }
    };

    return config;
};
