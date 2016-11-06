/* Sass */

module.exports = function (gulp, plugin, config) {
    return function () {
        var filterJS = plugin.filter('**/*.js', { restore: true });
        var filterCss = plugin.filter('**/*.css', { restore: true });
        var filterFonts = plugin.filter('**/fonts/*.*', { restore: true });

        return gulp.src('./bower.json')
            .pipe(plugin.mainBowerFiles({
                // setup overides to fix broken dependencies in bower
                overrides: config.bower.overrides
            }))

            // creating vendor.min.js from all js
            .pipe(filterJS)
            .pipe(plugin.concat('vendor.min.js'))
            .pipe(plugin.uglify())
            .pipe(gulp.dest(config.javascript.dir + config.dir.distribution))
            .pipe(filterJS.restore)

            // // creating vendor.min.css from all css
            .pipe(filterCss)
            .pipe(plugin.concat('vendor.min.css'))
            .pipe(plugin.cleanCss())
            .pipe(gulp.dest(config.sass.dir + config.dir.distribution))
            .pipe(filterCss.restore)

            // copying other assets like fonts to the style directory
            .pipe(filterFonts)
            .pipe(plugin.flatten())
            .pipe(gulp.dest(config.sass.dir + 'fonts/'))
        ;
    };
};