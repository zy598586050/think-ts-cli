/*
 * @Author: zhangyu
 * @Date: 2023-11-23 14:35:45
 * @LastEditTime: 2023-11-23 18:02:07
 */

// 该文件为模版示例文件，用于演示各项功能，请根据实际业务情况自行修改
import { Context, ExceptionType, Utils } from 'think-ts-lib'

// Token校验的中间件
export default (ctx: Context, next: () => void, error: ExceptionType) => {
    const token = ctx?.header?.authorization?.split('Bearer ')?.[1]
    if (Utils.validateToken(token)) {
        next()
    } else {
        error('非法请求或Token过期')
    }
}