 
const gulp = require('gulp');
const electron = require('electron-connect').server.create()
const loadPlugins = require('gulp-load-plugins')
const $ = loadPlugins()


let developmentMode = process.env.NODE_ENV == 'development'


gulp.task('electron', () => {
  electron.start()
  gulp.watch('./main.js', electron.restart)
  gulp.watch(['./public/*.js','./src/*'], electron.reload)
}); 

gulp.task('pug', () => {
  gulp.src('./src/*.pug')
    .pipe($.plumber())
    .pipe($.pug({pretty: true}))
    .pipe(gulp.dest('./public/'))
})

gulp.task('stylus', () => {
  gulp.src('src/*.styl')
    .pipe($.plumber() )
    .pipe($.stylus({compress: !developmentMode}))
    .pipe($.autoprefixer())
    .pipe(gulp.dest('./public/'))
})


gulp.task('watch', () => {
  gulp.watch('./src/*.pug', ['pug'])
  gulp.watch('./src/*.styl', ['stylus'])
  electron.reload()
})

gulp.task('default', ['electron','pug','stylus','watch'])


