/* Sass */

module.exports = function (gulp, plugin, config) {
    const latestPreset = require('babel-preset-latest'); 

    return function (source, production) {
        return gulp.src(typeof(source) === 'string' ? source : config.javascript.globs)
            .pipe( plugin.if(!production, plugin.sourcemaps.init()) )
            .pipe(plugin.plumber( {errorHandler: config.error.handler}) )
            .pipe(plugin.babel({
            	presets: latestPreset
            }))
            .pipe(plugin.concat('script.min.js'))
            .pipe(plugin.uglify())
            // remove the global 'use strict'; which babel adds by default.
            .pipe(plugin.replace(/^"use strict";/, ''))
            // do not write source maps if production is set to true
            .pipe( plugin.if(!production, plugin.sourcemaps.write()) )
            .pipe( 
                gulp.dest(config.javascript.outputDir) 
            )
        ;
    };
};