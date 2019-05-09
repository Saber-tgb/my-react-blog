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

// 获取标签列表
export const getTagsList = () => {
  return HttpClient.get(ApiConstants.GET_TAGS_LIST)
}

// 获取博客列表
export const getArticleList = (data: any) => {
  return HttpClient.get(ApiConstants.GET_ARTICLE_LIST, data)
}

// 获取文章内容
export const getArticleContent = (id: number) => {
  return HttpClient.get(`${ApiConstants.GET_ARTICLE_CONTENT}/${id}`)
}

// 获取分类列表
export const getCategoriesList = () => {
  return HttpClient.get(ApiConstants.GET_CATEGORIES_LIST)
}

// 获取标签列表
export const getTagsArticlesList = (data: any) => {
  return HttpClient.get(ApiConstants.GET_TAGS_ARTICLES_LIST, data)
}
