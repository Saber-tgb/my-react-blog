/*
 * @Description: combineReducers
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-07 14:50:45
 * @LastEditTime: 2019-05-10 14:24:14
 */
import { combineReducers } from 'redux'
import global from './global'
import article from './article'
import user from './user'

const rootReducer = combineReducers({
  global,
  user,
  article
})
export default rootReducer
