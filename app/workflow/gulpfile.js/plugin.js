
module.exports = {
    autoprefixer:      require('gulp-autoprefixer'),
    browserSync:       require('browser-sync'),
    babel:             require('gulp-babel'),

    cachebust:         require('gulp-cache-bust'),
    cleanCss:          require('gulp-clean-css'),
    concat:            require('gulp-concat'),
    debug:             require('gulp-debug'),

    filter:            require('gulp-filter'),
    flatten:           require('gulp-flatten'),
    if:                require('gulp-if'),

    mainBowerFiles:    require('gulp-main-bower-files'),
    notify:            require('gulp-notify'),
    plumber:           require('gulp-plumber'),

    sourcemaps:        require('gulp-sourcemaps'),
    sass:              require('gulp-sass'),
    rename:            require('gulp-rename'),
    replace:           require('gulp-replace'),

    uglify:            require('gulp-uglify'),
    watch:             require('gulp-watch'),

    vinylFile:          require('vinyl-file'),
    vinylSourceStream:  require('vinyl-source-stream'),
    vinylBuffer:        require('vinyl-buffer')
};
