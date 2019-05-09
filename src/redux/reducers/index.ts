/*
 * @Description: combineReducers
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-07 14:50:45
 * @LastEditTime: 2019-05-09 10:23:45
 */
import { combineReducers } from 'redux'
import global from './global'
import article from './article'

const rootReducer = combineReducers({
  global,
  article
})
export default rootReducer
