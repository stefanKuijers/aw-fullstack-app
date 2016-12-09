

module.exports = function( gulp, plugin, config ) {

    return function(serverName, callback = Function) {
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

        config.broswerSyncInstance = plugin.browserSync.create(serverName);
        config.broswerSyncInstance.init(options, callback);

        
        return config.broswerSyncInstance;
    };
};