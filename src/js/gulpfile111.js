/*
  demo目标：使用gulp完成项目搭建和代码压缩
  1、引进gulp模块，提供其API---gulp
  2、处理less
      1-引入less模块---gulp-less
      2-自动添加兼容前缀---gulp-autoprefixer
        antoprefixer({
          browsers：['last 5 versions', 'Android >= 4.0']  （定义使用的浏览器版本）
  　　　　cascade ： true  （定义对属性进行对齐操作）
  　　　　remove : true (去掉不必要的前缀) 
        })
      3-压缩css代码---gulp-cssmin
  3、处理js
      1-ES6语法转换---gulp-babel
        .pipe(babel({
            presets: ['env']
        }))
      2-压缩js代码---gulp-uglify
  4、处理html
      1-压缩html---gulp-htmlmin
        var options = {
          removeComments: true,//清除HTML注释
          collapseWhitespace: true,//压缩HTML
          collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
          removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
          removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
          removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
          minifyJS: true,//压缩页面JS
          minifyCSS: true//压缩页面CSS
        }
  5、调试
      1-修改代码，浏览器自动刷新---browser-sync
          引入：var bs = require("browser-sync").create();
                调用 .create() 意味着你得到一个唯一的实例并允许您创建多个服务器或代理。
          browserSync.init({//开启服务器
            server: {
              baseDir: "./dist" // 监控目录的基准路径
            },
            port:8888, // 配置服务端口
            notify: false // 设置页面是否有提示信息
          });
      2-监听：gulp.watch()
      3-重新加载：browserSync.reload
  6、新建一个dist文件夹，将压缩好的文件放入其中

  知识点：
  1、gulp.task(name[, deps], fn)
      执行任务
      参数1：任务的名字
      参数2：任务列表
      参数3：该函数定义任务所要执行的一些操作 
  2、gulp.src(globs[, options])
      输出符合所提供的匹配模式（glob）或者匹配模式的数组的文件
      参数1：匹配模式（string或者array）
  3、gulp.dest(path[, options])
      能被 pipe 进来，并且将会写文件
      参数1：文件将被写入的路径（输出目录）
  4、gulp.watch(glob [, opts], tasks) 或 gulp.watch(glob [, opts, cb])
      监视文件
      参数1：指定具体监控哪些文件的变动

npm install gulp-file-include gulp-less less gulp-autoprefixer gulp-cssmin gulp-uglify gulp-babel babel-core babel-preset-env gulp-htmlmin browser-sync --save-dev
*/
// 引入核心模块，方便路径操作
const path = require('path');
// 引入gulp及其相关插件
const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const htmlmin = require('gulp-htmlmin');
// 注意语法！！！！！！！！！！！！！！！！！
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

// 处理css
gulp.task('css', function () {
  gulp.src(path.join(__dirname,'src/css/*'))
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(path.join(__dirname,'dist/css')));
});
// 处理js
gulp.task('js', function () {
  gulp.src(path.join(__dirname, 'src/js/**/*.js'))
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(__dirname,'dist/js')))
});
// 处理html
gulp.task('html', function () {
  // 如果参数过多，可以定义一个对象，里边放需要修改的参数，下面htmlmin（option）：传入option即可
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  }
  gulp.src(path.join(__dirname, 'src/view/*.html'))
    .pipe(htmlmin(options))
    .pipe(gulp.dest(path.join(__dirname,'dist')))
});
// 将以上三个任务合并到一个任务中，这样只需要执行这一个总的任务，以上三个任务就会触发
gulp.task('build',['css','js','html']);
// 调试，当前任务名字   任务列表 任务要执行的操作
gulp.task('dev',['build'],function () {
    browserSync.init({
    server: {
      baseDir: "./dist" // 监控目录的基准路径
    },
    port:8888, // 配置服务端口
    notify: false // 设置页面是否有提示信息
  });
    gulp.watch(path.join(__dirname,'src/css/**/*'),['css']).on('change',reload);
    gulp.watch(path.join(__dirname,'src/js/**/*'),['js']).on('change',reload);
    gulp.watch(path.join(__dirname,'src/view/**/*'),['html']).on('change',reload);
})

// 配置默认任务，gulp == gulp.default，在cmd中直接运行gulp就行
gulp.task('default',['dev']);