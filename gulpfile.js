import gulp from 'gulp'
import gulpsass from 'gulp-sass'
import cssnano from 'gulp-cssnano'
import rev from 'gulp-rev'
import nodeSass from 'node-sass'
const sass=gulpsass(nodeSass)

import uglify from 'gulp-uglify-es';
import imagemin from 'gulp-imagemin';
import {deleteAsync} from 'del'

// const sass=require('gulp-sass')(require('node-sass')); // sass to acces sass and conevrt to css
// const cssnano=require('gulp-cssnano'); // css to one line
// const rev=require('gulp-rev');

gulp.task('css',function(done){
    console.log('Minifying css...');
    gulp.src('./assests/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assests/css'))

    gulp.src('./assests/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assests'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assests'))
    done();
})

gulp.task('js',function(done){
    console.log('Minfying js...');
    gulp.src('./assests/**/*.js')
    .pipe(uglify.default())
    .pipe(rev())
    .pipe(gulp.dest('./public/assests'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assests'))
    done()
})


gulp.task('images',function(done){
    console.log('Compressing images...');
    gulp.src('./assests/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assests'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assests'))
    done()
})

// empty the public/assests
gulp.task('clean:assests',function(done){
     deleteAsync('./public/assests').then(function(){
        done();
     });
    
});

gulp.task('build',gulp.series('clean:assests','css','js','images'),function(done){
    console.log('Building assests')
    done();
})
