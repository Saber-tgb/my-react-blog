/*
 * @Description: axios封装
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-06 17:59:49
 * @LastEditTime: 2019-05-06 18:00:49
 */
import axios from 'axios';
import { message } from 'antd';

const request = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:6060/'
      : 'http://120.79.10.11:6060/', // api的base_url
  timeout: 20000, // 请求超时时间
});

let timer: any;
//拦截请求
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.common['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    message.error('bed request');
    Promise.reject(error);
  },
);
//拦截响应
request.interceptors.response.use(
  (response) => {
    if (response.data.code === 401 && response.data.message)
      message.warning(response.data.message);
    return response.data;
  },
  (err) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (err && err.response) {
        switch (err.response.status) {
          case 400:
            message.error('错误请求');
            break;
          case 401:
            localStorage.clear();
            message.error('登录信息过期或未授权，请重新登录！');
            break;
          case 403:
            message.error('拒绝访问！');
            break;
          case 404:
            message.error('请求错误,未找到该资源！');
            break;
          case 500:
            message.error('服务器出问题了，请稍后再试！');
            break;
          default:
            message.error(`连接错误 ${err.response.status}！`);
            break;
        }
      } else {
        message.error('服务器出了点小问题，请稍后再试！');
      }
    }, 200); // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err);
  },
);

export default request;
