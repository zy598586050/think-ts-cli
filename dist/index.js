#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const kleur_1 = require("kleur");
const enquirer_1 = require("enquirer");
const download_git_repo_1 = __importDefault(require("download-git-repo"));
const util_1 = require("util");
const cli_spinners_1 = __importDefault(require("cli-spinners"));
const packageJson = require('../package.json');
const result = figlet_1.default.textSync('ThinkTS-CLI');
console.log(result);
const program = new commander_1.Command();
program.version(packageJson.version, '-V, --version', '查看版本号');
program.helpOption('-h, --help', '帮助文档');
program.description('一个用于快速构建 ThinkTS 项目的管理工具');
program.command('help [命令名称]')
    .description('用于查看某个命令的解释')
    .action((name) => {
    if (name === 'init') {
        console.log((0, kleur_1.green)('从 GitHub 中拷贝标准项目模版到本地'));
    }
    else if (name === 'create') {
        console.log((0, kleur_1.green)('用于快速构建模版代码'));
    }
});
program.command('init [项目名称]')
    .description('初始化一个项目')
    .action(async (name) => {
    // 项目克隆地址
    const url1 = 'zy598586050/think-ts';
    const url2 = 'zy598586050/think-ts-pro';
    // 询问
    try {
        const { isInit, projectType } = await (0, enquirer_1.prompt)([{
                type: 'confirm',
                name: 'isInit',
                message: `您确定要在 ${(0, kleur_1.green)('[' + name + ']')} 文件夹下创建项目？`,
                prefix: '😉'
            }, {
                name: 'projectType',
                type: 'select',
                message: '请选择项目类型',
                choices: ['1.基础框架', '2.带案例的框架'],
                prefix: '👉'
            }]);
        if (isInit) {
            const dir = path_1.default.resolve(process.cwd(), name);
            await gitClone(projectType === '1.基础框架' ? url1 : url2, dir);
        }
        else {
            console.log((0, kleur_1.red)('初始化项目提前结束'));
        }
    }
    catch (error) {
        console.log((0, kleur_1.red)(error));
    }
});
program.command('create [文件名称]')
    .description('用于快速创建模板代码')
    .action(async (name) => {
    try {
        // 询问
        const { templateype } = await (0, enquirer_1.prompt)([{
                name: 'templateype',
                type: 'select',
                message: '请选择生成模板的类型',
                choices: ['1.控制器', '2.验证器', '3.路由中间件', '4.模型文件'],
                prefix: '👉'
            }]);
        switch (templateype) {
            case '1.控制器':
                if (fs_1.default.existsSync(getDir('controller', name).wirteDir)) {
                    console.log(`${(0, kleur_1.yellow)('x')} 该文件存在`);
                }
                else {
                    fs_1.default.writeFileSync(getDir('controller', name).wirteDir, getDir('controller', name).readDir);
                    console.log(`${(0, kleur_1.green)('√')} 创建成功`);
                }
                break;
            case '2.验证器':
                if (fs_1.default.existsSync(getDir('validate', name).wirteDir)) {
                    console.log(`${(0, kleur_1.yellow)('x')} 该文件存在`);
                }
                else {
                    fs_1.default.writeFileSync(getDir('validate', name).wirteDir, getDir('validate', name).readDir);
                    console.log(`${(0, kleur_1.green)('√')} 创建成功`);
                }
                break;
            case '3.路由中间件':
                if (fs_1.default.existsSync(getDir('middleware', name).wirteDir)) {
                    console.log(`${(0, kleur_1.yellow)('x')} 该文件存在`);
                }
                else {
                    fs_1.default.writeFileSync(getDir('middleware', name).wirteDir, getDir('middleware', name).readDir);
                    console.log(`${(0, kleur_1.green)('√')} 创建成功`);
                }
                break;
            case '4.模型文件':
                if (fs_1.default.existsSync(getDir('service', name).wirteDir)) {
                    console.log(`${(0, kleur_1.yellow)('x')} 该文件存在`);
                }
                else {
                    fs_1.default.writeFileSync(getDir('service', name).wirteDir, getDir('service', name).readDir);
                    console.log(`${(0, kleur_1.green)('√')} 创建成功`);
                }
                break;
            default:
                break;
        }
    }
    catch (error) {
        console.log((0, kleur_1.red)(error));
    }
});
program.parse(process.argv);
// 生成地址
const getDir = (templateype, name) => {
    return {
        wirteDir: path_1.default.join(process.cwd(), `/app/${templateype}/${name}.ts`),
        readDir: path_1.default.join(path_1.default.resolve(__dirname, '..'), `template/${templateype}/index.ts`)
    };
};
// 克隆项目
const gitClone = async (url, dir) => {
    console.log(`${(0, kleur_1.green)('√')} 初始化开始`);
    let i = 0;
    const spinner = cli_spinners_1.default['dots'];
    const interval = setInterval(() => {
        process.stdout.write(`\r${spinner.frames[i = ++i % spinner.frames.length]} 正在初始化项目...`);
    }, spinner.interval);
    try {
        await (0, util_1.promisify)(download_git_repo_1.default)(url, dir);
        clearInterval(interval);
        process.stdout.write(`\r${(0, kleur_1.green)('√')} 初始化项目成功   `);
        console.log(`\n${(0, kleur_1.green)('√')} 项目地址：${(0, kleur_1.green)(dir)}`);
    }
    catch (error) {
        clearInterval(interval);
        process.stdout.write(`\r${(0, kleur_1.red)('x')} 初始化项目失败   `);
        console.log(`\n${(0, kleur_1.red)(error)}`);
    }
};
