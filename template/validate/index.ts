/*
 * @Author: zhangyu
 * @Date: 2023-11-23 14:36:33
 * @LastEditTime: 2023-11-23 18:03:13
 */

// 该文件为模版示例文件，用于演示各项功能，请根据实际业务情况自行修改
// 验证器
export default {
    // 验证规则
    rule: {
        email: 'email',
        password: 'require'
    },
    // 自定义验证消息提示
    message: {
        email: '请正确填写邮箱'
    },
    // 按场景划分校验参数
    scene: {
        sayWorld: ['email', 'password']
    }
}