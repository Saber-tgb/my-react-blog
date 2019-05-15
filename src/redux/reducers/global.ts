/*
 * @Description: 全局reducers
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-07 19:24:25
 * @LastEditTime: 2019-05-10 17:26:31
 */

import { IGlobalStates } from '@/constants/TypeConstants'
import * as actionTypes from '@/constants/ActionTypesConstants'
// import { TypeGlobalAction } from '../actions/global'
import { groupBy, random } from '@/utils'

const defaultState: IGlobalStates = {
  // 标签颜色
  colorList: [
    'magenta',
    'blue',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'geekblue',
    'purple'
  ],
  colorMap: {},
  // 浏览器窗口宽度
  windowWidth: 0,
  drawerVisible: false,
  // 登录框显示隐藏
  loginModalVisible: false,
  // 注册框显示隐藏
  registerModalVisible: false
}

const global = (state = defaultState, action: any) => {
  const { type, payload } = action
  switch (type) {
    // 显示登录注册框
    case actionTypes.AUTH_OPEN_AUTHMODAL:
      return { ...state, [`${payload}ModalVisible`]: true }
    // 关闭登录注册框
    case actionTypes.AUTH_CLOSE_AUTHMODAL:
      return { ...state, [`${payload}ModalVisible`]: false }
    // 浏览器窗口宽度
    case actionTypes.GLOBAL_GET_WINDOW_WIDTH:
      return { ...state, windowWidth: payload }

    case actionTypes.GLOBAL_OPEN_DRAWER:
      return { ...state, drawerVisible: true }

    case actionTypes.GLOBAL_CLOSE_DRAWER:
      return { ...state, drawerVisible: false }
    // 标签颜色
    case actionTypes.GLOBAL_COLOR_MAP:
      const list = groupBy(payload, (item: any) => item.userId)
      const colorList = state.colorList
      let colorMap = {}
      list.forEach((item: any) => {
        colorMap[item[0].userId] = colorList[random(colorList)]
        item[0]['replies'].forEach((d: any) => {
          if (!colorMap[d.userId])
            colorMap[d.userId] = colorList[random(colorList)]
        })
      })
      return { ...state, colorMap }
    default:
      return state
  }
}

export default global
