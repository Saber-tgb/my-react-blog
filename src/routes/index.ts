/*
 * @Description: 路由配置
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:47:40
 * @LastEditTime: 2019-04-29 17:53:22
 */
// 首页
import Home from '@/views/home/HomeContainer'
// 文章
import Article from '@/views/article/ArticleContainer'
// 归档
import Archives from '@/views/archives/ArchivesContainer'
// 分类
import Categories from '@/views/categories/CategoriesContainer'
// 列表
import List from '@/views/list/ListContainer'
// 关于
import About from '@/views/about/AboutContainer'

export default [
  { path: '', component: Home },
  { path: 'article', component: Article },
  { path: 'archives', component: Archives },
  { path: 'categories', component: Categories },
  { path: 'categories/:name', component: List },
  { path: 'tags/:name', component: List },
  { path: 'about', component: About }
]
