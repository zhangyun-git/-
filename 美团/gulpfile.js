var gulp = require('gulp'); // 引入gulp
var server = require('gulp-webserver'); // 起服务
var sass = require('gulp-sass'); // 编译sass
var autoprefixer = require('gulp-autoprefixer'); // 自动添加前缀
var sequence = require('gulp-sequence'); // 设置文件的执行顺序
var path = require('path'); // 引入node内置模块
var querystring = require('querystring');
var fs = require('fs'); // 引入node内置模块
var url = require('url'); // 引入node内置模块
var mock = require('./data'); // 引入数据

// 开发环境 --- 起服务
gulp.task('devserver', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090, // 配置端口号
            open: true, // 是否自动打开浏览器
            middleware: function(req, res, next) { // 拦截请求
                req.url = querystring.unescape(req.url);
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                // if (pathname === '/api/detail') {
                //     var poiid = url.parse(req.url, true).query.poiid;
                //     var target = mock(pathname).data.searchresult.filter(function(item) {
                //         return item.poiid == poiid;
                //     });
                //     res.end(JSON.stringify(target[0]));
                // }
                if (/\/api/g.test(pathname)) {
                    res.end(JSON.stringify(mock(req.url)));
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

// 开发环境 --- 编译scss
gulp.task('devsass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4']
        }))
        .pipe(gulp.dest('src/css'))
})

// 开发环境 --- 监听任务执行
gulp.task('watch', function() {
    return gulp.watch('src/scss/*.scss', ['devsass']);
})

// 开发环境 --- 设置任务执行顺序
gulp.task('dev', function(cb) {
    sequence('devsass', 'watch', 'devserver', cb)
})