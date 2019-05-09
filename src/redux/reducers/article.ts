/*
 * @Description: 文章reducers
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-09 10:12:41
 * @LastEditTime: 2019-05-09 10:20:13
 */

import { IArticleStates } from '@/constants/TypeConstants'
import * as actionTypes from '@/constants/ActionTypesConstants'

const defaultState: IArticleStates = {
  categoryList: [],
  tagList: [],
  recentList: []
}

const article = (state = defaultState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.CATEGORY_GETLIST:
      return { ...state, categoryList: payload }

    case actionTypes.TAG_GETLIST:
      return { ...state, tagList: payload }

    default:
      return state
  }
}

export default article
