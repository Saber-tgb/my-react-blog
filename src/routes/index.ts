/*
 * @Description: 路由配置
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:47:40
 * @LastEditTime: 2019-05-16 10:44:32
 */

import {
  WEB_ARTICLE_PATH,
  WEB_ARTICLE_ID_PATH,
  WEB_ARCHIVES_PATH,
  WEB_CATEGORIES_PATH,
  WEB_CATEGORIES_NAME_PATH,
  WEB_TAGS_NAME_PATH,
  WEB_ABOUT_PATH,
  NOT_FOUNT_PATH
} from '@/constants/RouteConstants'
// 首页
import Home from '@/views/home/HomeContainer'
// 文章
import Article from '@/views/article/ArticleContainer'
// 归档
import Archives from '@/views/archives/ArchivesContainer'
// 分类
import Categories from '@/views/categories/CategoriesContainer'
// 关于
import About from '@/views/about/AboutContainer'
// 标签列表
import TagsList from '@/views/tagsList/TagsListContainer'
// 404
import NotFound from '@/views/other/NotFound'

export default [
  { path: '', component: Home },
  { path: WEB_ARTICLE_PATH, component: Article },
  { path: WEB_ARTICLE_ID_PATH, component: Article },
  { path: WEB_ARCHIVES_PATH, component: Archives },
  { path: WEB_CATEGORIES_PATH, component: Categories },
  { path: WEB_CATEGORIES_NAME_PATH, component: TagsList },
  { path: WEB_TAGS_NAME_PATH, component: TagsList },
  { path: WEB_ABOUT_PATH, component: About },
  { path: NOT_FOUNT_PATH, component: NotFound },
  { path: '*', component: NotFound }
]
