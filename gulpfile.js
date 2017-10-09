var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var  connect = require('gulp-connect');//livereload
var  imagemin = require('gulp-imagemin');
var del = require('del');
// Clean 任务执行前，先清除之前生成的文件
 gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
  });
// scss,postcss任务
gulp.task('sass-postcss', function () {
	var plugins = [
     autoprefixer({browsers: ['last 40 version']}),
  ];
  gulp.src('./scss/*.scss')
    // .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css'))
    .pipe(connect.reload()); 
}); 
 //压缩js文件任务
 gulp.task('js', function(){
   gulp.src('./js/*.js')
       .pipe(uglify())       
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('./dist/js'))
       .pipe(connect.reload());
 });
  //定义html任务
  gulp.task('html', function () { 
      gulp.src('./*.html')
          .pipe(gulp.dest("./dist/"))
          .pipe(connect.reload());
  });
 //定义livereload任务
 gulp.task('connect', function () {
  connect.server({
      livereload: true,
      root: 'dist',
      port: 8000
   });
 });
//  定义观测任务
gulp.task('watch', function(){
       gulp.watch('./*.html', ['html']);
       gulp.watch('./scss/*.scss', ['sass-postcss']);
       gulp.watch('./js/*.js', ['js']);  
       gulp.watch('./img/*', ['img']);
})
// 定义默认执行任务
gulp.task('default', [ 'js', 'html','watch', 'connect','sass-postcss']);