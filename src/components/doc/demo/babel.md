
## babel
-------
[阮一峰文档](http://es6.ruanyifeng.com/#docs/intro)

#### 快速开始

1.安装工具
```
# 使用 babel-node（直接运行）
$ npm install --global babel-cli
# 使用 babel-register（require钩子）
$ npm install --save-dev babel-register
```
2.安装语法解析包
```javascript
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015
# react转码规则
$ npm install --save-dev babel-preset-react
```
3.配置`.babelrc`
```
{
    "presets": [ "es2015", "react" ],
    "plugins": []
}
```
4.使用
```
// 直接运行
$ babel-node es6.js
// 代码中添加
require("babel-register");
require("./index.js");

```
5.恭喜完成✅



------
### 详解
------


#### 配置文件.babelrc 
Babel的配置文件是`.babelrc`，存放在项目的根目录下。使用Babel的第一步，就是配置这个文件。

官方提供以下的规则集，你可以根据需要安装。
```javascript
# ES2015转码规则
$ npm install --save-dev babel-preset-es2015

# react转码规则
$ npm install --save-dev babel-preset-react
```
`presets`字段设定转码规则，编写`.babelrc`。
```javascript
{
    "presets": [
      "es2015",
      "react",
      "stage-2"
    ],
    "plugins": []
}
```



#### 命令行转码`babel-cli` (如果已经安装可以跳过)
Babel提供`babel-cli`工具，用于命令行转码。

它的安装命令如下。
```
$ npm install --global babel-cli
```
基本用法如下。
```
# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入一个文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或者
$ babel example.js -o compiled.js

# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
$ babel src --out-dir lib
# 或者
$ babel src -d lib

# -s 参数生成source map文件
$ babel src -d lib -s
```



#### babel-node 
`babel-cli`工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。

它不用单独安装，而是随`babel-cli`一起安装。然后，执行`babel-node`就进入REPL环境。
babel-node命令可以直接运行ES6脚本。将上面的代码放入脚本文件es6.js，然后直接运行。
```
$ babel-node es6.js
2
```


#### babel-register 
`babel-register`模块改写`require`命令，为它加上一个钩子。此后，每当使用require加载`.js`、`.jsx`、`.es`和.`es6`后缀名的文件，就会先用Babel进行转码。
```
$ npm install --save-dev babel-register
```
使用时，必须首先加载babel-register。
```javascript
require("babel-register");
require("./index.js");
```
需要注意的是，babel-register只会对require命令加载的文件转码，而不会对当前文件转码。另外，由于它是实时转码，所以只适合在开发环境使用。




#### babel-core 
如果某些代码需要调用Babel的API进行转码，就要使用`babel-core`模块。

安装命令如下。
```
$ npm install babel-core --save
```
然后，在项目中就可以调用`babel-core。`
```javascript
var babel = require('babel-core');

// 字符串转码
babel.transform('code();', options);
// => { code, map, ast }

// 文件转码（异步）
babel.transformFile('filename.js', options, function(err, result) {
  result; // => { code, map, ast }
});

// 文件转码（同步）
babel.transformFileSync('filename.js', options);
// => { code, map, ast }

// Babel AST转码
babel.transformFromAst(ast, code, options);
// => { code, map, ast }
```
配置对象`options`，可以参看官方文档[http://babeljs.io/docs/usage/options/](http://babeljs.io/docs/usage/options/)。

下面是一个例子。
```javascript
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['es2015']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
上面代码中，transform方法的第一个参数是一个字符串，表示需要被转换的ES6代码，第二个参数是转换的配置对象。
```


#### 浏览器环境 
Babel也可以用于浏览器环境。但是，从Babel 6.0开始，不再直接提供浏览器版本，而是要用构建工具构建出来。如果你没有或不想使用构建工具，可以通过安装5.x版本的`babel-core`模块获取。
```
$ npm install babel-core@5
```
另一种方法是使用babel-standalone模块提供的浏览器版本，将其插入网页。


