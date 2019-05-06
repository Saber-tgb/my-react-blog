import request from './axios';
import * as ApiConstants from '@/constants/ApiConstants';

// 登录
// 注册
// 获取博客列表
export const getArticleList = (data: any) => {
  return request.get(ApiConstants.GET_ARTICLE_LIST, data);
};
