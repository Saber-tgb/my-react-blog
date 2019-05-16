/*
 * @Description: file content
 * @Author: tgb
 * @Date: 2019-05-16 11:03:19
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-16 15:53:38
 */

import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Menu, Icon } from 'antd'
import routes from '@/routes/adminRoutes'

const SubMenu = Menu.SubMenu

interface IAdminSideBarNavStates {
  openKeys: string[]
  selectedKeys: string[]
}

class AdminSideBarNav extends React.Component<
  RouteComponentProps,
  IAdminSideBarNavStates
> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      openKeys: [],
      selectedKeys: []
    }
  }

  // 菜单渲染
  private renderMenu = (data: any) => {
    const renderRoute = (item: any, routeContextPath: string) => {
      let newContextPath = item.path
        ? `${routeContextPath}/${item.path}`
        : routeContextPath
      if (item.childRoutes) {
        return (
          <SubMenu
            title={
              <span>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </span>
            }
            key={newContextPath}
          >
            {item.childRoutes.map((r: any) => renderRoute(r, newContextPath))}
          </SubMenu>
        )
      } else {
        return (
          item.name && (
            <Menu.Item key={newContextPath}>
              <NavLink to={newContextPath}>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.name}</span>
              </NavLink>
            </Menu.Item>
          )
        )
      }
    }
    return data.childRoutes.map((d: any) => renderRoute(d, '/admin'))
  }

  // SubMenu 展开/关闭的回调
  onOpenChange = (openKeys: any) => {
    this.setState({ openKeys })
  }

  componentDidMount() {
    const pathname = this.props.location.pathname
    let index = pathname.lastIndexOf('/')
    const openKeys = [pathname.slice(0, index)]
    this.setState({ selectedKeys: [pathname], openKeys })
  }

  public render() {
    const { openKeys, selectedKeys } = this.state

    return (
      <div className="sibar-container" style={{ height: '100vh' }}>
        <Menu
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={this.onOpenChange}
          onClick={({ key }) => this.setState({ selectedKeys: [key] })}
          theme="dark"
          mode="inline"
        >
          {this.renderMenu(routes)}
        </Menu>
      </div>
    )
  }
}

export default withRouter(AdminSideBarNav)
