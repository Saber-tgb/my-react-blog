/*
 * @Description: 配置所有API配置项
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-06 17:59:49
 * @LastEditTime: 2019-05-17 14:37:55
 */

// 登录
export const POST_LOGIN = 'login'
// 注册
export const POST_REGISTER = 'register'
// 获取博客标签
export const GET_TAGS_LIST = 'tags/getList'
// 获取博客列表
export const GET_ARTICLE_LIST = 'article/getList'
// 获取文章内容
export const GET_ARTICLE_CONTENT = 'article/get'
// 获取分类列表
export const GET_CATEGORIES_LIST = 'categories/getList'
// 获取文章标签列表
export const GET_TAGS_ARTICLES_LIST = 'tags/getArticles'
// 用户提交评论
export const POST_USER_COMMENT = 'user/comment'
// 用户答复评论
export const POST_USER_REPLY = 'user/reply'
// 删除用户评论
export const DELETE_COMMENT_DEL = 'comment/del'
// 删除用户答复
export const DELETE_REPLY_DEL = 'reply/del'
// 获取关于页面评论
export const GET_ABOUT_COMMENTS = 'comment/getAboutComments'

// ------------------------ admin后台管理 ------------------------
// 创建文章
export const POST_ARTICLE_CREATE = 'article/create'
// 更新文章
export const POST_ARTICLE_UPDATE = 'article/update'
// 删除文章
export const delete_article = 'article/delete'
// 获取用户列表
export const GET_USER_List = 'user/getUserList'
// 删除注册用户
export const DELETE_USER = 'user/delete'
