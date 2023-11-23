<p align="center">
  <img width="300px" src="https://www.think-js.cn/icon.png">
</p>

<p align="center">
  <a href="http://www.think-js.cn">
    <img src="https://img.shields.io/badge/npm-v1.1.0-blue">
  </a>
  <a href="http://www.think-js.cn">
    <img src="https://img.shields.io/badge/downloads-110k/month-green">
  </a>
  <a href="http://www.think-js.cn">
    <img src="https://codecov.io/gh/element-plus/element-plus/branch/dev/graph/badge.svg?token=BKSBO2GLZI"/>
  </a>
  <br>
</p>

<p align="center">一个企业级的NodeJS应用框架</p>

- 💪 减少造轮子拿来即用
- 🔥 集成了众多常用SDK

## ThinkJS-CLI

ThinkJS-CLI 是ThinkJS框架配套的脚手架工具，可以通过命令行的方式来创建项目。

## 目录结构

```
.
├── bin
│   ├── think-create.js
│   ├── think-init.js
│   └── think.js
└── src
    ├── clone.js
    ├── create.js
    ├── init.js
    └── template
        ├── controller
        │   └── index.js
        ├── middleware
        │   └── index.js
        ├── router
        │   └── index.js
        └── validate
            └── index.js
├── index.js
├── package.json
└── README.md
```

#### 安装

通过下面的命令全局安装 ``think-js-cli`` 命令行工具

```
npm install think-js-cli -g
```

#### 构建ThinkJS模版项目

```
think-js-cli init project-name
```

#### 创建模版代码

```
think-js-cli create -c file-name
```

#### create命令帮助

```
-c, --controller  生成一个控制器
-v, --validate    生成一个验证器
-m, --middleware  生成一个路由中间件
-r, --router      生成一个路由文件
```