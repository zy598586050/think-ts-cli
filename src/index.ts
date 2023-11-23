#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import figlet from 'figlet'
import { green, red, blue, yellow } from 'kleur'
import { prompt } from 'enquirer'
import download from 'download-git-repo'
import { promisify } from 'util'
import spinners from 'cli-spinners'

const packageJson = require('../package.json')
const result = figlet.textSync('ThinkTS-CLI')
console.log(result)

const program = new Command()
program.version(packageJson.version, '-V, --version', '查看版本号')
program.helpOption('-h, --help', '帮助文档')
program.description('一个用于快速构建 ThinkTS 项目的管理工具')

program.command('help [命令名称]')
    .description('用于查看某个命令的解释')
    .action((name: string) => {
        if (name === 'init') {
            console.log(green('从 GitHub 中拷贝标准项目模版到本地'))
        } else if (name === 'create') {
            console.log(green('用于快速构建模版代码'))
        }
    })

program.command('init [项目名称]')
    .description('初始化一个项目')
    .action(async (name: string) => {
        // 项目克隆地址
        const url1 = 'zy598586050/think-ts'
        const url2 = 'zy598586050/think-ts-pro'
        // 询问
        try {
            const { isInit, projectType }: { isInit: string; projectType: string; } = await prompt([{
                type: 'confirm',
                name: 'isInit',
                message: `您确定要在 ${green('[' + name + ']')} 文件夹下创建项目？`,
                prefix: '😉'
            }, {
                name: 'projectType',
                type: 'select',
                message: '请选择项目类型',
                choices: ['1.基础框架', '2.带案例的框架'],
                prefix: '👉'
            }])
            if (isInit) {
                const dir = path.resolve(process.cwd(), name)
                await gitClone(projectType === '1.基础框架' ? url1 : url2, dir)
            } else {
                console.log(red('初始化项目提前结束'))
            }
        } catch (error: any) {
            console.log(red(error))
        }
    })

program.command('create [文件名称]')
    .description('用于快速创建模板代码')
    .action(async (name: string) => {
        try {
            // 询问
            const { templateype }: { templateype: string } = await prompt([{
                name: 'templateype',
                type: 'select',
                message: '请选择生成模板的类型',
                choices: ['1.控制器', '2.验证器', '3.路由中间件', '4.模型文件'],
                prefix: '👉'
            }])
            switch (templateype) {
                case '1.控制器':
                    if (fs.existsSync(getDir('controller', name).wirteDir)) {
                        console.log(`${yellow('x')} 该文件存在`)
                    } else {
                        fs.writeFileSync(getDir('controller', name).wirteDir, getDir('controller', name).readDir)
                        console.log(`${green('√')} 创建成功`)
                    }
                    break;
                case '2.验证器':
                    if (fs.existsSync(getDir('validate', name).wirteDir)) {
                        console.log(`${yellow('x')} 该文件存在`)
                    } else {
                        fs.writeFileSync(getDir('validate', name).wirteDir, getDir('validate', name).readDir)
                        console.log(`${green('√')} 创建成功`)
                    }
                    break;
                case '3.路由中间件':
                    if (fs.existsSync(getDir('middleware', name).wirteDir)) {
                        console.log(`${yellow('x')} 该文件存在`)
                    } else {
                        fs.writeFileSync(getDir('middleware', name).wirteDir, getDir('middleware', name).readDir)
                        console.log(`${green('√')} 创建成功`)
                    }
                    break;
                case '4.模型文件':
                    if (fs.existsSync(getDir('service', name).wirteDir)) {
                        console.log(`${yellow('x')} 该文件存在`)
                    } else {
                        fs.writeFileSync(getDir('service', name).wirteDir, getDir('service', name).readDir)
                        console.log(`${green('√')} 创建成功`)
                    }
                    break;
                default:
                    break;
            }
        } catch (error: any) {
            console.log(red(error))
        }
    })

program.parse(process.argv)

// 生成地址
const getDir = (templateype: string, name: string) => {
    return {
        wirteDir: path.join(process.cwd(), `/app/${templateype}/${name}.ts`),
        readDir: path.join(path.resolve(__dirname, '..'), `template/${templateype}/index.ts`)
    }
}

// 克隆项目
const gitClone = async (url: string, dir: string) => {
    console.log(`${green('√')} 初始化开始`)
    let i = 0
    const spinner = spinners['dots']
    const interval = setInterval(() => {
        process.stdout.write(`\r${spinner.frames[i = ++i % spinner.frames.length]} 正在初始化项目...`)
    }, spinner.interval)
    try {
        await promisify(download)(url, dir)
        clearInterval(interval)
        process.stdout.write(`\r${green('√')} 初始化项目成功   `)
        console.log(`\n${green('√')} 项目地址：${green(dir)}`)
    } catch (error: any) {
        clearInterval(interval)
        process.stdout.write(`\r${red('x')} 初始化项目失败   `)
        console.log(`\n${red(error)}`)
    }
}