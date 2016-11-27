

module.exports = function( gulp, plugin, config ) {

    return function(callback = Function) {
        var options = {
            open: 'external',
            ghostMode: {
                clicks: true,
                location: true,
                forms: true,
                scroll: true
            }
        };

        if (config.server.type === 'express') {
            options.server = config.server.target;
        } else {
            options.proxy = config.server.target;
        }

        return plugin.browserSync.init( options, callback );
    };
};