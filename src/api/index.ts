import HTTPClient from './axios'
import * as ApiConstants from '@/constants/ApiConstants'

const commonOption = {
  withCredentials: false
}

const config = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:6060/'
      : 'http://120.79.10.11:6060/',
  timeout: 3000
}

const HttpClient = new HTTPClient(commonOption, config)

// 登录
// 注册
// 获取博客列表
export const getArticleList = (data: any) => {
  return HttpClient.get(ApiConstants.GET_ARTICLE_LIST, data)
}
