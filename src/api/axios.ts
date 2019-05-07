/*
 * @Description: axios封装
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-07 14:50:45
 * @LastEditTime: 2019-05-07 16:39:38
 */

import Axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios'
import * as qs from 'qs'
import { message } from 'antd'

export interface IResponseSuccess {
  code: number
  data: any
}

export interface IResponseFailed {
  code: number
  data: any
}

let timer: any

class HttpClient {
  public commonOption: AxiosRequestConfig
  public axios: AxiosInstance

  constructor(commonOption: AxiosRequestConfig, config: AxiosRequestConfig) {
    this.commonOption = commonOption
    this.axios = Axios.create(config)

    //添加默认的请求拦截器
    this.axios.interceptors.request.use(
      (requestConfig: AxiosRequestConfig): any => {
        const token = localStorage.getItem('token')
        if (token) {
          requestConfig.headers.common['Authorization'] = 'Bearer ' + token
        }
        return requestConfig
      },
      (error: AxiosError) => {
        message.error('bed request')
        Promise.reject(error)
      }
    )
    // 添加默认的响应拦截器
    this.axios.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.data.code === 401 && response.data.message)
          message.warning(response.data.message)
        return response.data
      },
      (error: AxiosError) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          if (error && error.response) {
            switch (error.response.status) {
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
                message.error(`连接错误 ${error.response.status}！`)
                break
            }
          } else {
            message.error('服务器出了点小问题，请稍后再试！')
          }
        }, 200) // 200 毫秒内重复报错则只提示一次！
      }
    )
  }

  /**
   * post
   * @method post
   * The same as axios.post
   * 返回值为any
   */
  public post = (url: string, data?: any, option?: AxiosRequestConfig): any => {
    return this.axios.post(
      url,
      data,
      Object.assign({}, this.commonOption, option)
    )
  }

  /**
   * post
   * @method post
   * The same as axios.post
   * 返回值为any
   */
  public get = (url: string, option?: AxiosRequestConfig): any => {
    return this.axios.get(url, Object.assign({}, this.commonOption, option))
  }

  /**
   * postFrom
   * @method postForm
   * post 发送表单的快捷方式
   */
  public postForm = (
    url: string,
    data?: any,
    option?: AxiosRequestConfig
  ): any => {
    return this.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: [
        ({ data }: { data: any }) => {
          return qs.stringify(data)
        }
      ]
    })
  }
}

export default HttpClient
