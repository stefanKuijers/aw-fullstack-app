/* Cache bust */
/*
	Appends a timestamp to the links to static assets to bust the cache.
	This means when we deploy a new version online we no longer have to 
	press CTRL + SHIFT + R to do a hard refresh.
*/

module.exports = function (gulp, plugin, config) {

    return function (production) {
        return gulp.src(config.cachebust.globs)
            .pipe(plugin.cachebust({
		        type: 'timestamp'
		    }))
            .pipe( 
                gulp.dest(config.cachebust.outputDir) 
            )
        ;
    };
};