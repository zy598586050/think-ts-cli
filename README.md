<p align="center">
  <img width="300px" src="https://www.think-js.cn/icon.png">
</p>

<p align="center">
  <a href="https://www.think-ts.cn">
    <img src="https://img.shields.io/badge/npm-v1.0.0-blue">
  </a>
  <a href="https://www.think-ts.cn">
    <img src="https://img.shields.io/badge/downloads-110k/month-green">
  </a>
  <a href="https://www.think-ts.cn">
    <img src="https://codecov.io/gh/element-plus/element-plus/branch/dev/graph/badge.svg?token=BKSBO2GLZI"/>
  </a>
  <br>
</p>

<p align="center">一个企业级的NodeJS应用框架</p>

- 💪 ORM思想用对象的方式CRUD
- 🔥 应用级提炼封装更贴近业务场景

## ThinkTS-CLI

ThinkTS-CLI 是ThinkTS框架配套的脚手架工具，可以通过命令行的方式来创建项目。

## 目录结构

<p align="center">
  <img width="100%" src="https://www.think-js.cn/cli.png">
</p>


```
.
├── dist
│   └── index.js
├── src
│   └── index.js
└── template
    ├── controller
    │   └── index.js
    ├── middleware
    │   └── index.js
    ├── service
    │   └── index.js
    └── validate
        └── index.js
├── package.json
├── tsconfig.json
└── README.md
```

#### 安装

通过下面的命令全局安装 ``think-ts-cli`` 命令行工具

```
npm install think-ts-cli -g
```

#### 构建ThinkTS模版项目

```
think-ts-cli init project-name
```

<p align="center">
  <img width="100%" src="https://www.think-js.cn/cli2.png">
</p>

#### 创建模版代码

```
think-ts-cli create
```

<p align="center">
  <img width="100%" src="https://www.think-js.cn/cli3.png">
</p>