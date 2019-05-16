/*
 * @Description: 后台管理路由模块
 * @Author: tgb
 * @Date: 2019-05-16 14:20:26
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-16 16:51:29
 */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import adminRoutes from '@/routes/adminRoutes'

const routes = [adminRoutes]

class AdminRoutes extends React.Component {
  /**
   * 根据路由表生成路由组件
   * @param {Array} routes - 路由配置表
   * @param {String} contextPath - 路径
   */
  private renderRoutes(routes: any, contextPath: string) {
    const children: any[] = []
    const renderRoute = (item: any, routeContextPath: string) => {
      let newContextPath = item.path
        ? `${routeContextPath}/${item.path}`
        : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')
      if (item.component && item.childRoutes) {
        const childRoutes = this.renderRoutes(item.childRoutes, newContextPath)
        children.push(
          <Route
            key={newContextPath}
            render={(props) => (
              <item.component {...props}>{childRoutes}</item.component>
            )}
            path={newContextPath}
          />
        )
      } else if (item.component) {
        children.push(
          <Route
            key={newContextPath}
            component={item.component}
            path={newContextPath}
            exact
          />
        )
      } else if (item.childRoutes) {
        item.childRoutes.forEach((r: any) => renderRoute(r, newContextPath))
      }
    }
    routes.forEach((item: any) => renderRoute(item, contextPath))
    return children
  }

  public render() {
    const children = this.renderRoutes(routes, '/')
    return <Switch>{children}</Switch>
  }
}

export default AdminRoutes
