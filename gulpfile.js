'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const webpackServer = require('./server.js');
const spawn = require('child_process').spawn;

let serverSrc = 'src-server/**';

let nodeProcess = null;

gulp.task('compile-server-code', () => {
   return gulp.src(serverSrc)
      .pipe(babel({
         plugins: ['babel-plugin-transform-es2015-modules-commonjs']
      }))
      .on('error', function(err) {
         console.log('Error compiling server: ', err);
         this.emit('end');
      })
      .pipe(gulp.dest('dist-server'));
});

gulp.task('restart-server', ['compile-server-code'], () => {
   if (nodeProcess) {
      // This will also restart the process, because of the exit listener on
      // the process
      nodeProcess.kill();
   }
   let startNodeProcess = () => {
      nodeProcess = spawn('node', ['dist-server/index.js']);
      nodeProcess.stdout.on('data', (data) => console.log(data + ''));
      nodeProcess.stderr.on('data', (data) => console.error(data + ''));
      nodeProcess.on('exit', (exitCode) => {
         console.error('Server died with: ', exitCode+'');
         startNodeProcess();
      });
   }
   if(!nodeProcess){
      startNodeProcess();
   }
});

gulp.task('start-webpack-server', () => {
   webpackServer.listen(3000, 'localhost', function(err, result) {
      if (err) {
         console.log(err);
      }
      console.log('Listening at localhost:3000');
   });
});

gulp.task('default', ['start-webpack-server', 'restart-server'], () => {
   gulp.watch(serverSrc, ['restart-server']);
});
