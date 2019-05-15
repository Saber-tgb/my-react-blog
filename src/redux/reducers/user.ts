/*
 * @Description: 用户reducers
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-10 14:21:40
 * @LastEditTime: 2019-05-10 14:46:22
 */
import { IUserStates } from '@/constants/TypeConstants'
import * as actionTypes from '@/constants/ActionTypesConstants'
import jwtDecode from 'jwt-decode'

let defaultState: IUserStates = {
  userId: 0,
  username: '',
  auth: 0,
  avatarColor: '#52c41a' // 用户头像颜色
}

// if (
//   !!localStorage.getItem('token') &&
//   localStorage.getItem('token') !== 'undefined'
// ) {
//   const { userId, username, auth } = jwtDecode(localStorage.token)
//   defaultState = Object.assign(defaultState, { userId, username, auth })
// }

const user = (state = defaultState, action: any) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.USER_LOGIN:
      const { userId, username, auth } = jwtDecode(payload.token)
      return { ...state, userId, username, auth }

    case actionTypes.USER_LOGINOUT:
      return { userId: 0, username: '', auth: 0, avatarColor: '#52c41a' }

    default:
      return state
  }
}

export default user
