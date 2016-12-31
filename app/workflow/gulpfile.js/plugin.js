
module.exports = {
    autoprefixer:      require('gulp-autoprefixer'),
    browserSync:       require('browser-sync'),
    babel:             require('gulp-babel'),

    concat:            require('gulp-concat'),
    cleanCss:          require('gulp-clean-css'),
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
