/*
 * @Description: 用户相关actions
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-10 14:46:44
 * @LastEditTime: 2019-05-15 17:09:36
 */
import * as actionTypes from '@/constants/ActionTypesConstants'
import { message } from 'antd'
import * as $api from '@/api'

export const login = (username: string, password: string) => {
  const params = {
    username,
    password
  }
  return (dispatch: any) =>
    $api.postLogin(params).then((res: any) => {
      if (res.code === 200) {
        localStorage.setItem('token', res.token)
        dispatch({
          type: actionTypes.USER_LOGIN,
          payload: { token: res.token }
        })
      } else {
        message.error(res.message)
      }
      return res
    })
}

export const register = (username: string, password: string) => {
  const params = {
    username,
    password
  }
  return () =>
    $api.postRegister(params).then((res: any) => {
      if (res.code === 200) message.success(res.message)
      else message.error(res.message)
      return res
    })
}

export const logout = () => {
  localStorage.removeItem('token')
  return { type: actionTypes.USER_LOGINOUT }
}
