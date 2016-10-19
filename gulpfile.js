/**
 * 
 * 1.LESS 编译  压缩 合并
 * 
 * 2.JS合并 压缩
 * 
 * 3.img复制
 * 
 * 4.html压缩
 */
//在 gulpfile 中先载入 gulp包  提供API
var gulp = require('gulp');
//1.LESS 
var less = require('gulp-less'); 
// 压缩
var cssnano =require('gulp-cssnano');
//JS  合并
var concat  = require('gulp-concat');
//压缩
var uglify = require('gulp-uglify');
gulp.task('style',function(){
	//这里是在 执行style 任务时自动执行的
	
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({stream:true}));
	 
});

gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/scripts'))
	.pipe(browserSync.reload(
		{stream:true}
	)); //复制到目录
});


//3.  图片复制


gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream:true}));
});


//4. html

var htmlmin = require('gulp-htmlmin');

gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace:true,
		removeComments:true 
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));
});


var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({
		server:{
			baseDir:['dist']
		}
	},function(err,bs){
		console.log(bs.options.getIn(["urls","local"]));
	});
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/images/*.*',['image']);
	gulp.watch('src/*.html',['html']);
});
