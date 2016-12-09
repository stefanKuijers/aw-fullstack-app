

module.exports = function( gulp, plugin, config ) {

    return function() {
        function reload(delay) {
            setTimeout( function() {
                config.broswerSyncInstance.reload();
            }, delay);
        }
        
        return plugin.watch( 
            config.watch.globs, 
            function(vinyl) {

            	console.log(vinyl.extname);
                switch(vinyl.extname) {
                    case '.json':
                        // bower.json change means we did a bower install
                        if (vinyl.basename === "bower.json" && config.dependencyManagement.enabled) {
                            config.dependencyManagement.task();
                            // we need a delay in reloading the browser cause 
                            // the vendor files need to be created before we reload
                            reload(200);
                        }
                    break;

                    case '.scss':
                        if (config.sass.enabled) {
                            config.sass.task(); 
                        }
                        // no reload needed cause its streamed
                    break;

                    case '.css':
                        // if (!config.sass.enabled) {
                            plugin.vinylFile.readSync(vinyl.path)
                                .pipe(plugin.vinylSourceStream(vinyl.path))
                                .pipe(plugin.vinylBuffer())
                                .pipe(config.broswerSyncInstance.stream());
                        // }
                    break;

                    case '.js':
                        if (config.javascript.enabled) {
                            config.javascript.task(config.javascript.globs);
                        }

                        reload(100); // little delay so JS files can be created
                    break;

                    // all files that should trigger a simple reload
                    // add if you want to reaload on other exentions as well
                    case '.inc':
                    case '.tpl':
                    case '.php':
                    case '.html':
                        reload(0);
                    break;
                    
                    default: break;
                }
            }
        );
    };
};