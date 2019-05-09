/*
 * @Description: 路由配置
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:47:40
 * @LastEditTime: 2019-05-09 17:10:21
 */
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

export default [
  { path: '', component: Home },
  { path: 'article', component: Article },
  { path: 'article/:id', component: Article },
  { path: 'archives', component: Archives },
  { path: 'categories', component: Categories },
  { path: 'categories/:name', component: TagsList },
  { path: 'tags/:name', component: TagsList },
  { path: 'about', component: About }
]
