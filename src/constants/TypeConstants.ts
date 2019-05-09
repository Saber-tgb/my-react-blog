/*
 * @Description: 通用类型常量
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-07 19:32:34
 * @LastEditTime: 2019-05-09 15:21:21
 */

export interface IGlobalStates {
  colorList: string[]
  colorMap: object
  windowWidth: number
  drawerVisible: boolean
  loginModalVisible: boolean
  registerModalVisible: boolean
}

export interface IArticleStates {
  categoryList: any[]
  tagList: any[]
  recentList: any[]
}
