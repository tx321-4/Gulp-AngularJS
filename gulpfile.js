var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath : 'src/',
    devPath : 'build/',
    prdPath : 'dist/'
};

gulp.task('lib', function(){
    return  gulp.src('bower_components/**/*.js')
                .pipe(gulp.dest(app.devPath + 'vendor'))                
                .pipe(gulp.dest(app.prdPath + 'vendor'))
                .pipe($.connect.reload());
                
            
});

gulp.task('html', function(){
    return  gulp.src(app.srcPath + '**/*.html')
                .pipe(gulp.dest(app.devPath))
                .pipe(gulp.dest(app.prdPath))
                .pipe($.connect.reload());
});

gulp.task('json', function(){
    return  gulp.src(app.srcPath + 'data/**/*.json')
                .pipe(gulp.dest(app.devPath + 'data'))
                .pipe(gulp.dest(app.prdPath + 'data'))
                .pipe($.connect.reload());    
});

gulp.task('less', function(){
    return  gulp.src(app.srcPath + 'style/index.less')
                .pipe($.plumber())
                .pipe($.less())
                .pipe(gulp.dest(app.devPath + 'css'))
                .pipe($.cssmin())
                .pipe(gulp.dest(app.prdPath + 'css'))
                .pipe($.connect.reload());  
});

gulp.task('js', function(){
    return  gulp.src(app.srcPath + 'script/**/*.js')
                .pipe($.plumber())
                .pipe($.concat('index.js'))
                .pipe(gulp.dest(app.devPath + 'js'))
                .pipe($.uglify())
                .pipe(gulp.dest(app.prdPath + 'js'))
                .pipe($.connect.reload());    
});

gulp.task('image', function(){
    return  gulp.src(app.srcPath + 'image/**/*')   
                .pipe($.plumber())             
                .pipe(gulp.dest(app.devPath + 'image'))
                .pipe($.imagemin())
                .pipe(gulp.dest(app.prdPath + 'image'))
                .pipe($.connect.reload());   
});


gulp.task('clean', function(){
  return gulp.src([app.devPath, app.prdPath])
             .pipe($.clean());
});


gulp.task('build',gulp.series('clean', gulp.parallel('image','js','less','lib','json','html')));

gulp.task('server', function(){
    $.connect.server({
        root:[app.devPath],
        livereload: true,
        port: 3636
    });
    open('http://localhost:3636');
    
    gulp.watch('bower_components/**/*.js', gulp.series('lib'));
    gulp.watch(app.srcPath + '**/*.html',gulp.series('html'));
    gulp.watch(app.srcPath + 'data/**/*.json',gulp.series('json'));
    gulp.watch(app.srcPath + 'style/**/*.less',gulp.series('less'));
    gulp.watch(app.srcPath + 'script/**/*.js',gulp.series('js'));
    gulp.watch(app.srcPath + 'image/**/*',gulp.series('image'));


});
gulp.task('open',gulp.series('build', gulp.parallel('server')));

