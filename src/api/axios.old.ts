/*
 * @Description: axios封装
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-07 14:50:45
 * @LastEditTime: 2019-05-07 16:21:49
 */
import axios from 'axios'
import { message } from 'antd'

// 创建axios实例
const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:6060/'
      : 'http://120.79.10.11:6060/', // api的base_url
  timeout: 20000 // 请求超时时间
})

let timer: any
//拦截请求
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error) => {
    message.error('bed request')
    Promise.reject(error)
  }
)
//拦截响应
request.interceptors.response.use(
  (response) => {
    if (response.data.code === 401 && response.data.message)
      message.warning(response.data.message)
    return response.data
  },
  (err) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            message.error('错误请求')
            break
          case 401:
            localStorage.clear()
            message.error('登录信息过期或未授权，请重新登录！')
            break
          case 403:
            message.error('拒绝访问！')
            break
          case 404:
            message.error('请求错误,未找到该资源！')
            break
          case 500:
            message.error('服务器出问题了，请稍后再试！')
            break
          default:
            message.error(`连接错误 ${err.response.status}！`)
            break
        }
      } else {
        message.error('服务器出了点小问题，请稍后再试！')
      }
    }, 200) // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err)
  }
)

interface IParams {
  method: string
  url: string
  data: string | object
  headers: object
  responseType?: string
}

export default class AxiosRequest {
  public requestHandle = (params: IParams) => {
    return new Promise((resolve, reject) => {
      request(params)
        .then((res) => {
          console.log(res)
          resolve(res.data)
        })
        .catch((error) => {})
    })
  }

  public post = (url: string, params: object | string, options = {}) => {
    return this.requestHandle({
      method: 'post',
      url,
      data: params,
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    })
  }

  public get = (url: string, params: object | string, options = {}) => {
    return this.requestHandle({
      method: 'get',
      url,
      data: params,
      headers: {
        'Content-Type': 'application/json'
      },
      ...options
    })
  }
}
