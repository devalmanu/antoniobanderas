const syntax = 'scss'; // Syntax: sass or scss;
const gulpVersion = '4'; // Gulp version: 3 or 4
gmWatch = false; // ON/OFF GraphicsMagick watching "img/_src" folder (true/false). Linux install gm: sudo apt update; sudo apt install graphicsmagick

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const fileInclude = require('gulp-file-include');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const rsync = require('gulp-rsync');
const imageResize = require('gulp-image-resize');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');

// Local Server
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});

// Sass|Scss Styles
gulp.task('styles', function () {
	return gulp.src('app/' + syntax + '/**/*.' + syntax + '')
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))

		.pipe(rename({ suffix: '', prefix: '' }))
		.pipe(autoprefixer(['last 15 versions']))
		// .pipe(cleancss({ level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function () {
	return gulp.src([
		'app/js/common.js', // Always at the end
	])
		.pipe(concat('scripts.min.js'))
		// .pipe(uglify({ output: { comments: false } }))
		.pipe(gulp.dest('app/js'))
		.pipe(browserSync.stream())
});

gulp.task('fileInclude', function () {
	gulp.src('app/part/*.html')
		.pipe(fileInclude({
			prefix: '@@',
			basepath: '@file'
		}))
		.pipe(gulp.dest('app/part/'))
		.pipe(browserSync.stream());
});
// Images @x1 & @x2 + Compression | Required graphicsmagick (sudo apt update; sudo apt install graphicsmagick)
gulp.task('img1x', function () {
	return gulp.src('app/img/_src/**/*.*')
		.pipe(imageResize({ width: '100%' }))
		.pipe(gulp.dest('app/img/@1x/'))
});
gulp.task('img2x', function () {
	return gulp.src('app/img/_src/**/*.*')
		.pipe(imageResize({ width: '100%' }))
		.pipe(gulp.dest('app/img/@2x/'))
});

//svg sprite
gulp.task('svgSprites', function () {
	return gulp.src('app/img/svg/*.svg')
		.pipe(svgSprite({
			shape: {
				dimension: {
					maxWidth: 500,
					maxHeight: 500
				},
				spacing: {
					padding: 0
				},
				transform: [{
					"svgo": {
						"plugins": [
							{ removeViewBox: false },
							{ removeUnusedNS: false },
							{ removeUselessStrokeAndFill: true },
							{ cleanupIDs: false },
							{ removeComments: true },
							{ removeEmptyAttrs: true },
							{ removeEmptyText: true },
							{ collapseGroups: true },
							{ removeAttrs: { attrs: '(fill|stroke)' } }
						]
					}
				}]
			},
			mode: {
				stack: {
					sprite: "../sprite.svg" //sprite file name
				}
			},
		}))
		.pipe(gulp.dest('app/img/sprite/'))
	// .pipe(browserSync.stream());
});
// Clean @*x IMG's
gulp.task('cleanimg', function () {
	return del(['app/img/@*'], { force: true })
});

// HTML Live Reload
gulp.task('code', function () {
	return gulp.src('app/*.html')
		.pipe(browserSync.reload({ stream: true }))
});

// Deploy
gulp.task('rsync', function () {
	return gulp.src('app/**')
		.pipe(rsync({
			root: 'app/',
			hostname: 'username@yousite.com',
			destination: 'yousite/public_html/',
			// include: ['*.htaccess'], // Includes files to deploy
			exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
			recursive: true,
			archive: true,
			silent: false,
			compress: true
		}))
});


// If Gulp Version 4
if (gulpVersion == 4) {

	// Img Processing Task for Gulp 4
	gulp.task('img', gulp.parallel('img1x', 'img2x'));
	// gulp.task('htmlInclude', gulp.parallel('fileInclude'));
	gulp.task('svg', gulp.parallel('svgSprites'));
	gulp.task('watch', function () {
		gulp.watch('app/' + syntax + '/**/*.' + syntax + '', gulp.parallel('styles'));
		// gulp.watch('app/part/*.html', gulp.parallel('fileInclude'));
		gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
		gulp.watch('app/*.html', gulp.parallel('code'));
		gulp.watch('app/img/svg/*.svg', gulp.parallel('svg'));
		gmWatch && gulp.watch('app/img/_src/**/*', gulp.parallel('img')); // GraphicsMagick watching image sources if allowed.
	});
	gmWatch ? gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'browser-sync', 'watch'))
		: gulp.task('default', gulp.parallel('styles', 'svg', 'scripts', 'browser-sync', 'watch'));

};
