
module.exports = function(gulp, plugin) {
    // require the config file
    var gulpConfig = require('./config.json');
    gulpConfig.javascript = gulpConfig.javascript || {};
    gulpConfig.sass = gulpConfig.sass || {};
    gulpConfig.bower = gulpConfig.bower || {};

    /*
        helper functions
    */
    function getTask(name) {
        return require('./task/' + name + '.js')( gulp, plugin, config );
    }

    function hasProperties(obj) {
        for(var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                return true;
            }
        }
        return false;
    }

    /*
        config object
    */
    var config = {

        // loading settings from config.json
        production: gulpConfig.production,
        host: gulpConfig.host,
        browserSync: {},
        bower: {
            enabled: hasProperties(gulpConfig.bower),
            overrides: gulpConfig.bower.overrides
        },
        javascript: {
            enabled: hasProperties(gulpConfig.javascript),
            dir: gulpConfig.javascript.dir,
            path: gulpConfig.javascript.path
        },
        sass: {
            enabled: hasProperties(gulpConfig.sass),
            dir: gulpConfig.sass.dir,
            path: gulpConfig.sass.path
        },
        watch: {
            path: gulpConfig.watch
        },
        dir: {
            root: gulpConfig.dir.root || "./",
            source: gulpConfig.dir.source,
            distribution: gulpConfig.dir.distribution
        },

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

    // hooking tasks after config is setup cause config is needed
    config.browserSync.task = getTask('browser-sync');
    config.bower.task = getTask('vendor');
    config.javascript.task = getTask('javascript');
    config.sass.task = getTask('sass');
    config.watch.task = getTask('watch');

    return config;
};
