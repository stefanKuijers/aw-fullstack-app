/* Sass */

module.exports = function (gulp, plugin, config) {
    return function () {
        // grab this file all the files we need
        let stream = gulp.src( config.sass.globs )
            // initialize sourcemaps plugin
            .pipe( plugin.sourcemaps.init() )
            // make sure that if we get error (invalid sass) that we don't break out of the server
            .pipe( plugin.plumber( { errorHandler: config.error.handler } ) )
            // concat
            .pipe(plugin.concat('style.min.css'))
            // compile it to css and set some settings for error handling
            .pipe( plugin.sass() )
            // prefixing css rules to support older browsers
            .pipe( plugin.autoprefixer() )
            // minify
            .pipe( plugin.cleanCss() )
            // write the sourcemap into the stream if we are not in production
            .pipe( plugin.sourcemaps.write(config.production ? '.' : null) )
            // write what you have in the following directory
            .pipe( gulp.dest( config.sass.outputDir ) );

        if (config.broswerSyncInstance) {
            // let browserSync stream this file content to all connected browsers
        	stream.pipe(config.broswerSyncInstance.stream({match: '**/*.css'}) );
        } 

        return stream;
    };
};