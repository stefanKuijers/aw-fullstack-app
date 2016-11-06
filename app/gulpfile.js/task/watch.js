

module.exports = function( gulp, plugin, config ) {

    return function() {
        function reload(delay) {
            setTimeout( function() {
                plugin.browserSync.reload();
            }, delay);
        }
        
        return plugin.watch( 
            config.watch.path, 
            function(vinyl) {
            	console.log(vinyl.extname);
                switch(vinyl.extname) {
                    case '.json':
                        // bower.json change means we did a bower install
                        if (vinyl.basename === "bower.json" && config.bower.enabled) {
                            config.bower.task();
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
                        if (!config.sass.enabled) {
                            plugin.vinylFile.readSync(vinyl.path)
                                .pipe(plugin.vinylSourceStream(vinyl.path))
                                .pipe(plugin.vinylBuffer())
                                .pipe(plugin.browserSync.stream());
                        }
                    break;

                    case '.js':
                        if (config.javascript.enabled) {
                            config.javascript.task(config.javascript.path);
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