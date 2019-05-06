/*
 * @Description: 博客路由模块
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:32:30
 * @LastEditTime: 2019-05-06 15:15:57
 */
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from '@/routes'

class LayoutRoute extends React.Component {
  /**
   * 根据路由表生成路由组件
   * @param {Array} routes - 路由配置表
   * @param {String} contextPath - 路径
   */
  private renderRoutes(routes: any[], contextPath: string) {
    const children: any[] = []
    const renderRoute = (item: any, routeContextPath: string) => {
      let newContextPath = item.path
        ? `${routeContextPath}/${item.path}`
        : routeContextPath
      newContextPath = newContextPath.replace(/\/+/g, '/')

      children.push(
        <Route
          key={newContextPath}
          component={item.component}
          path={newContextPath}
          exact
        />
      )
    }
    routes.forEach((item) => renderRoute(item, contextPath))
    return children
  }

  public render() {
    const children = this.renderRoutes(routes, '/')
    return <Switch>{children}</Switch>
  }
}

export default LayoutRoute
