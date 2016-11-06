

module.exports = function( gulp, plugin, config ) {

    return function() {
        var options = {
            open: 'external',
            ghostMode: {
                clicks: true,
                location: true,
                forms: true,
                scroll: true
            }
        };

        if (config.host) {
            options.proxy = config.host;
        } else {
            options.server = config.dir.root;
        }

        plugin.browserSync.init( options );
    };
};