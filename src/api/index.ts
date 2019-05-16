import HTTPClient from './axios';
import * as ApiConstants from '@/constants/ApiConstants';

const commonOption = {
  withCredentials: false,
};

const config = {
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:6060/'
      : 'http://120.79.10.11:6060/',
  timeout: 3000,
};

const HttpClient = new HTTPClient(commonOption, config);

// 登录
export const postLogin = (data: any) => {
  return HttpClient.post(ApiConstants.POST_LOGIN, data);
};

// 注册
export const postRegister = (data: any) => {
  return HttpClient.post(ApiConstants.POST_REGISTER, data);
};

// 获取标签列表
export const getTagsList = () => {
  return HttpClient.get(ApiConstants.GET_TAGS_LIST);
};

// 获取博客列表
export const getArticleList = (params: any) => {
  return HttpClient.get(ApiConstants.GET_ARTICLE_LIST, params);
};

// 获取文章内容
export const getArticleContent = (id: number) => {
  return HttpClient.get(`${ApiConstants.GET_ARTICLE_CONTENT}/${id}`);
};

// 获取分类列表
export const getCategoriesList = () => {
  return HttpClient.get(ApiConstants.GET_CATEGORIES_LIST);
};

// 获取标签列表
export const getTagsArticlesList = (params: any) => {
  return HttpClient.get(ApiConstants.GET_TAGS_ARTICLES_LIST, params);
};

// 用户提交评论
export const postUserComment = (data: any) => {
  return HttpClient.post(ApiConstants.POST_USER_COMMENT, data);
};

// 用户答复评论
export const postUserReply = (data: any) => {
  return HttpClient.post(ApiConstants.POST_USER_REPLY, data);
};

// 删除用户评论
export const deleteUserComment = (data: any) => {
  return HttpClient.post(ApiConstants.DELETE_COMMENT_DEL, data);
};

// 删除用户答复
export const deleteUserReply = (data: any) => {
  return HttpClient.post(ApiConstants.DELETE_REPLY_DEL, data);
};

// 获取关于页面评论
export const getAboutComments = () => {
  return HttpClient.get(ApiConstants.GET_ABOUT_COMMENTS);
};

// ********************* 后台管理 *********************
// 获取注册用户列表
export const getUserList = (params: any) => {
  return HttpClient.get(ApiConstants.GET_USER_List, params);
};
// 删除注册用户
export const deleteUser = (data: any) => {
  return HttpClient.post(ApiConstants.DELETE_USER, data);
};
