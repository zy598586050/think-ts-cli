/*
 * @Author: zhangyu
 * @Date: 2023-11-23 14:36:14
 * @LastEditTime: 2023-11-23 18:01:15
 */

// 该文件为模版示例文件，用于演示各项功能，请根据实际业务情况自行修改
import { Db } from 'think-ts-lib'

// 模型，数据处理层
export default class HelloModel {
    // 这里编写数据库处理逻辑给到控制器层
    async getList(params: any) {
        // 定义模型
        let model = Db('user')
        // 是否带了email的筛选条件
        if (params?.email) {
            model = model.where('email', params.email)
        }

        // ... 各种筛选条件

        // 查询
        const list = await model.page(params?.current, params?.size).select()
        // 带搜索条件的总数量
        const totalCount = await model.count()
        return {
            list,
            totalCount
        }
    }
}