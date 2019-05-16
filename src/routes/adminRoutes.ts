/*
 * @Description: 后台管理路由配置
 * @Author: tgb
 * @Date: 2019-05-16 15:46:18
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-16 16:46:15
 */
import AdminLayout from '@/views/admin/layout/AdminLayoutContainer'
import lazy from '@/components/lazy/Lazy'
import Home from '@/views/admin/home/Home'
// const Edit = lazy(() => import('@/views/admin/article/Edit'))
const Login = lazy(() => import('@/views/admin/login/Login'))
// const ArticleManage = lazy(() => import('@/views/admin/article/Manage'))
const UserManage = lazy(() => import('@/views/admin/user/User'))

export default {
  path: 'admin',
  component: AdminLayout,
  childRoutes: [
    {
      path: '',
      icon: 'home',
      name: '首页',
      component: Home
    },
    {
      path: 'articles',
      icon: 'edit',
      name: '文章管理',
      childRoutes: [
        // { path: 'edit', icon: 'edit', name: '新增文章', component: Edit }
        // {
        //   path: 'manage',
        //   icon: 'folder',
        //   name: '管理文章',
        //   component: ArticleManage
        // }
      ]
    },
    {
      path: 'usermanage',
      name: '用户管理',
      icon: 'user',
      component: UserManage
    },
    { path: 'login', component: Login }
    // { path: '*', component: PageNotFound }
  ]
}
