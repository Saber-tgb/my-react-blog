/*
 * @Description: 全局action
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-07 19:26:45
 * @LastEditTime: 2019-05-09 16:34:37
 */
import * as actionTypes from '@/constants/ActionTypesConstants'

export const getWindowWidth = () => {
  const body = document.getElementsByTagName('body')[0]
  return {
    type: actionTypes.GLOBAL_GET_WINDOW_WIDTH,
    payload: body.clientWidth
  }
}

export const openDrawer = () => ({
  type: actionTypes.GLOBAL_OPEN_DRAWER
})

export const closeDrawer = () => ({
  type: actionTypes.GLOBAL_CLOSE_DRAWER
})

// 生成头像的颜色匹配
export const generateColorMap = (commentList: any) => ({
  type: actionTypes.GLOBAL_COLOR_MAP,
  payload: commentList
})
