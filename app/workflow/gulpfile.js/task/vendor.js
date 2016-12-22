/* Sass */

module.exports = function (gulp, plugin, config) {
    return function () {
        const filterJS = plugin.filter('**/*.js', { restore: true, dot: true });
        const filterCss = plugin.filter('**/*.css', { restore: true, dot: true });
        const filterFonts = plugin.filter('**/fonts/*.*', { restore: true, dot: true });

        return gulp.src(config.dependencyManagement.path)
            .pipe(plugin.mainBowerFiles({
                // setup overides to fix broken dependencies in bower
                overrides: config.dependencyManagement.overrides
            }))
            // .pipe(plugin.debug())

            // creating vendor.min.js from all js
            .pipe(filterJS)
            .pipe(plugin.concat('vendor.min.js'))
            .pipe(plugin.uglify())
            .pipe(gulp.dest(config.javascript.outputDir))
            .pipe(filterJS.restore)

            // // creating vendor.min.css from all css
            .pipe(filterCss)
            .pipe(plugin.concat('vendor.min.css'))
            .pipe(plugin.cleanCss())
            .pipe(gulp.dest(config.sass.outputDir))
            .pipe(filterCss.restore)

            // copying other assets like fonts to the style directory
            .pipe(filterFonts)
            .pipe(plugin.flatten())
            .pipe(gulp.dest(config.sass.fontsDir))
        ;
    };
};