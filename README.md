# Gulp-AngularJS
>Gulp+AngularJS 仿制拉勾网web app单页面
* 单页应用
    * 定义：页面跳转无刷新
    * 方法：利用路由控制 "页面" 跳转
    * 优点：页面切换流畅、前后端分离

## 第一步：搭建开发环境
* 第三方依赖管理工具：bower
    * 只能在cmd上运行命令
```bash
常用命令：bower init、 bower install、 bower uninstall

配置文件：.bowerrc、 bower.json
```
> 安装 bower
```bash
npm install bower -g
```
>bower 初始化
```cmd
cd 项目目录
bower init
```
>安装 AngularJS
```cmd
bower install --save angular
```

>自定义安装依赖的安装目录-----这一步可省略！！！
* 根目录下创建.bowerrc  

```json
{
    "directory" : "lib"
}
```
### 依赖就会安装在 `lib` 文件夹下

## 安装 less
```bash
npm install less -g
```
>查看版本号
```bash
lessc -v
lessc --version
```

## 自动化构建工具------gulp
* 优点：基于流、任务化
* 常用API： src、dest、watch、task、pipe

>全局安装
```bash
npm install -g gulp
```
#
## 第二步：项目初始化
```bash
npm init
```
>安装 gulp、gulp-clean、gulp-concat、gulp-connect、gulp-cssmin、gulp-imagemin、gulp-less、gulp-load-plugins、gulp-plumber、gulp-uglify、open
```bash
npm install --save-dev gulp
```



> 根目录下创建文件 `gulpfile.js` ,文件夹 `src`、 `build`、`dist`

## 目录结构说明
```bash
Gulp-AngularJS
├── build #前端项目开发环境目录
├── dist #前端项目生产环境目录
├── node_modules #依赖安装目录
├── src #前端项目源码目录
├── bower.json #项目bower配置文件
├── gulpfile.js #项目gulp配置文件
├── package-lock.json #项目配置文件
├── package.json #项目配置文件
└──README.md #项目的说明文档，markdown 格式
```

# 开始编辑gulp任务

* gulp 插件
    * gulp
    * gulp-cli
    * gulp-clean
    * gulp-concat
    * gulp-connect
    * gulp-cssmin
    * gulp-imagemin
    * gulp-less
    * gulp-load-plugins
    * gulp-plumber
    * gulp-uglify
    * open
    * gulp-server

* gulp 任务
    * lib
    * html
    * json
    * css
    * js
    * image
    * clean
    * reload
    * watch


```javascript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath : 'src/',
    devPath : 'build/',
    prdPath : 'dist/'
};

gulp.task('lib', function(){
    gulp.src('bower_components/**/*.js')
        .pipe(gulp.dest(app.devPath + 'vendor'))
        .pipe(gulp.dest(app.prdPath + 'vendor'));
            
})
```
>运行 `gulp lib`

* 报错 
```bash
 Cannot read property 'apply' of undefined
```
* 原因：gulp-cli未全局安装
```bash
npm install -g gulp-cli
```

 * 项目里也安装一下 `gulp-cli`
```bash
npm install --save-dev gulp-cli
```


* 运行成功后， `dist`、`build`中会有生成一个`lib` 文件夹, 包含angularjs
* 运行`gulp lib`有一个警告：代码提示我们，是不是忘了写异步完成的标记？
    * 原因：gulp4.0+ gulp的task任务要加上返回值，如果是单任务，没有return其实也是可以执行的，不会报错。
    * 当多任务执行，涉及到执行顺序时。没有return，就会导致当前任务还没完成就会同步
    执行下一个任务，就会报错。
* 解决方案：加上 return返回值
```bash
gulp.task('lib', function(){
return  gulp.src('bower_components/**/*.js')
        ...
})
```
#
>编写gulp `html` 任务
```javascript
gulp.task('html', function(){
return  gulp.src(app.srcPath + '**/*.html')
            .pipe(gulp.dest(app.devPath))
            .pipe(gulp.dest(app.prdPath));    
})
```
* 新建文件 index.html 、 src/view/main.html

## 目录结构说明
```bash
src
├── view 
│    └── main.html 
├── index.html #首页入口文件

```
>运行 `gulp html`
# 
>编写gulp `json` 任务
```javascript
gulp.task('json', function(){
return  gulp.src(app.srcPath + 'data/**/*.json')
            .pipe(gulp.dest(app.devPath + 'data'))
            .pipe(gulp.dest(app.prdPath + 'data'));    
});
```

* 新建文件 json/1.json

## 目录结构说明
```bash
src
├── data 
│    └── 1.json
├── view 
│    └── main.html 
├── index.html #首页入口文件

```
>运行 `gulp json`

# 
>编写gulp `less` 任务
```javascript
gulp.task('less', function(){
return  gulp.src(app.srcPath + 'style/index.less')
            .pipe($.less())
            .pipe(gulp.dest(app.devPath + 'css'))
            .pipe($.cssmin())
            .pipe(gulp.dest(app.prdPath + 'css'));    
});
```

* 新建文件 style/index.less、style/1.less

>index.less
```less
@import '1.less';
```
>1.less
```less
a{color:#000;}
```
## 目录结构说明
```bash
src
├── data 
│    └── 1.json
├── style 
│    ├── index.less
│    └── 1.less
├── view 
│    └── main.html 
├── index.html #首页入口文件

```
>运行 `gulp less`
# 
>编写gulp `js` 任务

```javascript
gulp.task('js', function(){
return  gulp.src(app.srcPath + 'script/**/*.js')
            .pipe($.concat('index.js'))
            .pipe(gulp.dest(app.devPath + 'js'))
            .pipe($.uglify())
            .pipe(gulp.dest(app.prdPath + 'js'));    
});
```
* 新建文件 script/1.js、script/2.js

>1.js
```javascript
console.log(1);
```
>2.js
```javascript
console.log(2);
```
## 目录结构说明
```bash
src
├── data 
│    └── 1.json
├── script 
│    ├── 1.js
│    └── 2.js
├── style 
│    ├── index.less
│    └── 1.less
├── view 
│    └── main.html 
├── index.html #首页入口文件

```
>运行 `gulp js`
# 
>编写gulp `image` 任务
```javascript
gulp.task('image', function(){
    return  gulp.src(app.srcPath + 'image/**/*')                
                .pipe(gulp.dest(app.devPath + 'image'))
                .pipe($.imagemin())
                .pipe(gulp.dest(app.prdPath + 'image'));  
});
```
* 新建文件 image/logo.png

## 目录结构说明
```bash
src
├── data 
│    └── 1.json
├── image 
│    └── logo.png
├── script 
│    ├── 1.js
│    └── 2.js
├── style 
│    ├── index.less
│    └── 1.less
├── view 
│    └── main.html 
├── index.html #首页入口文件
```
>运行 `gulp image`
#
>编写gulp `clean` 任务
```javascript
gulp.task('clean', function(){
return  gulp.src([app.devPath, app.prdPath])
            .pipe($.clean());
});
```
>运行 `gulp clean` ---清空 `build`、`dist`
#
>编写gulp `build` 任务
```javascript
gulp.task('build',['image','js','less','lib','html','json']);
```

>运行 `gulp build`
* 报错 Task function must be specified
    * 由于是gulp build 是gulp3.0+的指定任务，现在版本是gulp4.0+，
    * 需要使用gulp.series和gulp.parallel，因为gulp任务现在只有两个参数
```javascript
gulp.task('build',gulp.series('clean', gulp.parallel('image','js','less','lib','json','html')));
```
>运行 `gulp build` 成功


# 
>编写gulp `server` 任务
```javascript
gulp.task('server', function(){
    $.connect.server({
        root:[app.devPath],
        livereload: true,
        port: 3636
    });
    open('http://localhost:3636');
});
```
* 运行 gulp server 报错
    * 没有安装 gulp-server
```bash
npm install --save-dev gulp-server
```
#
>编写gulp `watch` 任务
```javascript
gulp.watch('bower_components/**/*',['lib']);
gulp.watch(app.srcPath + '**/*.html',['html']);
gulp.watch(app.srcPath + 'data/**/*.json',['json']);
gulp.watch(app.srcPath + 'style/**/*.less',['less']);
gulp.watch(app.srcPath + 'script/**/*.js',['js']);
gulp.watch(app.srcPath + 'image/**/*',['image']);
```
* 报错 --- watch task has to be a function 
    * gulp4.0+的写法改 了
```javascript
gulp.watch('bower_components/**/*.js', gulp.series('lib'));
gulp.watch(app.srcPath + '**/*.html',gulp.series('html'));
gulp.watch(app.srcPath + 'data/**/*.json',gulp.series('json'));
gulp.watch(app.srcPath + 'style/**/*.less',gulp.series('less'));
gulp.watch(app.srcPath + 'script/**/*.js',gulp.series('js'));
gulp.watch(app.srcPath + 'image/**/*',gulp.series('image'));
```


>增加 实时刷新页面 reload
```javascript
gulp.task('lib', function(){
return  gulp.src('bower_components/**/*.js')
            .pipe(gulp.dest(app.devPath + 'vendor'))
            .pipe(gulp.dest(app.prdPath + 'vendor'))
            .pipe($.connect.reload());          
});
```

>增加 gulp-plumber 
* 可以阻止 gulp 插件发生错误导致进程退出并输出错误日志
```javascript
gulp.task('less', function(){
return  gulp.src(app.srcPath + 'style/index.less')
            .pipe($.plumber())
            .pipe($.less())
            .pipe(gulp.dest(app.devPath + 'css'))
            .pipe($.cssmin())
            .pipe(gulp.dest(app.prdPath + 'css')) 
            .pipe($.connect.reload());          
});
```
#

##  到此gulp 的打包命令 搭建完成 