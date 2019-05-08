/**
 * 一个基于Axios的HttpClient封装
 * @author stackfizz
 * @description 为了减少通用参数传递，统一返回值处理
 */

import * as qs from 'qs'
import Axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError
} from 'axios'

export interface IResponseSuccess {
  code: number
  data: any
}

export interface IResponseFailed {
  code: number
  data: any
}

class HttpClient {
  public commonOption: AxiosRequestConfig
  public axios: AxiosInstance

  constructor(commonOption: AxiosRequestConfig, option: AxiosRequestConfig) {
    this.commonOption = commonOption
    this.axios = Axios.create(option)

    /***
     * 添加默认的响应拦截器，把成功返回且code===0的结果直接返回data
     */
    this.axios.interceptors.response.use(
      (response: AxiosResponse): any => {
        if (response.data && response.data.code === 0) {
          return response.data.data
        } else if (response.data) {
          return response.data
        } else {
          return response
        }
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )
  }

  // Custom commonOption via merge
  public setCommonOption = (config: AxiosRequestConfig): void => {
    this.commonOption = Object.assign(this.commonOption, config)
  }

  // Return current commonOption
  public getCommonOption() {
    return Object.assign({}, this.commonOption)
  }

  // Set request interceptor
  public setRequestInterceptor = (
    onFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig,
    onRejected?: (error: any) => any
  ) => {
    this.axios.interceptors.request.use(onFulfilled, onRejected)
  }

  // Set response interceptor
  public setResponseInterceptor = (
    onFulfilled?: (response: AxiosResponse) => AxiosResponse,
    onRejected?: (error: any) => any
  ) => {
    this.axios.interceptors.response.use(onFulfilled, onRejected)
  }

  // Custom AxiosRequestConfig via merge
  public setRequestConfig = (config: AxiosRequestConfig) => {
    this.axios.defaults = Object.assign(this.axios.defaults, config)
  }

  /**
   * get
   * @method get
   * The same as axios.get
   * 返回值为any，是因为添加了拦截器，返回值为后端的 data
   */
  public get = (url: string, option?: AxiosRequestConfig): any => {
    return this.axios.get(url, Object.assign({}, this.commonOption, option))
  }

  public put = (url: string, data?: any, option?: AxiosRequestConfig): any => {
    return this.axios.put(
      url,
      data,
      Object.assign({}, this.commonOption, option)
    )
  }

  public post = (url: string, data?: any, option?: AxiosRequestConfig): any => {
    return this.axios.post(
      url,
      data,
      Object.assign({}, this.commonOption, option)
    )
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
