## React + Typescript + Webpack 开发环境配置

### 文件目录

``` bash
.
├── build # 前端配置文件
│   ├── index.html
│   ├── webpack.config.js
├── app # 前端目录
├── .gitignore
├── package.json
├── tsconfig.json
└── tslint.json
```

### 配置流程

#### 创建项目

``` bash
mkdir my-project && cd my-project
npm init
```

#### 安装依赖

``` bash
npm i -g webpack webpack-dev-server
npm i --save-dev react react-dom @types/react @types/react-dom
npm i --save ts-loader source-map-loader
npm link --save webpack webpack-dev-server
```

#### 配置 webpack

``` js
/* build/webpack.config.js */
const config = {
  entry: './Yoda/index.tsx',
  output: {
    filename: 'app.bundle.js',
    path: './public',
    publicPath: '/assets'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  devtool: 'eval'
}

module.exports = config
```

#### 配置 tsconfig

``` js
/* tsconfig.json */
```

``` json
{
    "compilerOptions": {
        "outDir": "./public/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "files": [
        "./app/index.tsx"
    ]
}
```

至此，基本配置已经完成，后面创建好一个入口页面和`entry`文件就可以跑起来了：

``` js
/* build/index.html */
```

``` html
<!doctype html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    <title>Hello world</title>
    <script src="http://localhost:8080/webpack-dev-server.js"></script>
  </head>
  <body>
    <div id="app"></div>
    <script src="assets/app.bundle.js"></script>
  </body>
</html>
```

``` ts
/* app/index.tsx */
import * as React from 'react'
import { render } from 'react-dom'

interface IAppProps {}
interface IAppState {}

class App extends React.Component<IAppProps, IAppState> {
  public render(): JSX.Element {
    return (
      <div>
        Hello world
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))
```

#### 启动项目

``` bash
webpack-dev-server --inline --config build/webpack.config.dev.js --content-base build
```

:smirk: :smirk: :smirk: 出来吧神龙

### 简单的说明

#### Webpack 配置

Webpack配置其实是一件很简单的事情，这也是他具备强大竞争力的重要因素。  
从配置文件中可以看出，里面无非就是`entry`、`output`和`loader`，如果需要编译CSS，在`loader`里面加一个即可：

``` bash
npm i --save-dev style-loader css-loader
```

``` js
/* build/webpack.config.js */
const config = {
  // ...
  module: {
    loaders: [
      {
        test: /\.css/,
        loader: 'style-loader!css-loader'
      }
    ],
    // ...
  },
  // ...
}
```

#### 项目启动

项目启动的命令过长，放进 `package.json` 的 `scripts` 就好了：

``` js
/* package.json */
```

``` json
{
  "scripts": {
    "dev": "webpack-dev-server --inline --config build/webpack.config.dev.js --content-base build",
  },
}
```

再执行以下命令试试：

``` bash
npm run dev
```

#### tslint

在开发中如果有个约束代码的工具能够让代码更加优雅，以前用的是 `eslint`，如果用 `.tsx` 就不能生效了，这里推荐使用 `tslint` ：

```
npm i -g tslint
cd my-project
tslint init
```

这样会在项目文件中创建一个现成的 `tslint` 配置文件： `tslint.json` ，个性化方案可以自行设置。

### 参考
> [webpack 新官网](https://webpack.js.org/)  
> [webpack dev server](https://webpack.github.io/docs/webpack-dev-server.html)  
> [tsconfig.json 配置文档](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)  
> [style-loader](https://github.com/webpack/style-loader)  
> [tslint](https://github.com/palantir/tslint)  