/*
 * @Description: 通用类型常量
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-07 19:32:34
 * @LastEditTime: 2019-05-10 14:25:42
 */

export interface IGlobalStates {
  colorList: string[]
  colorMap: object
  windowWidth: number
  drawerVisible: boolean
  loginModalVisible: boolean
  registerModalVisible: boolean
}

export interface IUserStates {
  userId: number
  username: string
  auth: number
  avatarColor: string
}

export interface IArticleStates {
  categoryList: any[]
  tagList: any[]
  recentList: any[]
}
