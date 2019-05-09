/*
 * @Description: 文章action
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-09 10:29:32
 * @LastEditTime: 2019-05-09 11:30:27
 */
import * as actionTypes from '@/constants/ActionTypesConstants'
import * as $api from '@/api'

// 获取所有博客标签
export const getTagsList = () => {
  return (dispatch: any) =>
    $api.getTagsList().then((res: any) => {
      dispatch({ type: actionTypes.TAG_GETLIST, payload: res.data })
    })
}

// 获取分类列表
export const getCategoriesList = () => {
  return (dispatch: any) =>
    $api.getCategoriesList().then((res: any) => {
      dispatch({ type: actionTypes.CATEGORY_GETLIST, payload: res.data })
    })
}
