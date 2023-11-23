/*
 * @Author: zhangyu
 * @Date: 2023-11-22 20:59:59
 * @LastEditTime: 2023-11-23 17:48:20
 */

// 该文件为模版示例文件，用于演示各项功能，请根据实际业务情况自行修改
import { Context, Controller, ShowSuccess, GetParams, View, M } from 'think-ts-lib'

export default class HelloController extends Controller {

  // 用于演示 GET接口功能
  sayHello(ctx: Context) {
    // 获取传参
    const params = GetParams(ctx)
    const result = [{
      title: 'ThinkTS',
      subtitle: '欢迎使用ThinkTS框架',
      doc: 'https://www.thinkts.cn',
      params
    }]
    return ShowSuccess(result)
  }

  // 用于演示 POST接口功能
  sayWorld(ctx: Context) {
    // 获取传参并校验参数
    const params = GetParams(ctx, true)
    const result = [{
      title: 'ThinkTS',
      subtitle: '欢迎使用ThinkTS框架',
      doc: 'https://www.thinkts.cn',
      params
    }]
    return ShowSuccess(result)
  }

  // 用于演示模型调用
  async getList(ctx: Context) {
    // 获取传参
    const params = GetParams(ctx)
    // 用模型去处理查询数据
    const { list, totalCount } = await M().getList(params)
    return ShowSuccess({
        list,
        totalCount
    })
  }

  // 用于演示视图界面
  showIndex() {
    return View('index', {
      count: 9863763,
      title: 'ThinkTS',
      subtitle: '欢迎使用ThinkTS框架'
    })
  }
  
}