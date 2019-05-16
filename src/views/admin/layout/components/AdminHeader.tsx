/*
 * @Description: Admin管理后台头部
 * @Author: tgb
 * @Date: 2019-05-16 10:54:04
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-16 11:30:35
 */

import React from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Icon, Dropdown, Menu } from 'antd'
import AuthorAvatar from '@/components/authorAvatar/AuthorAvatar'

type PathParamsType = {}

type PropsType = RouteComponentProps<PathParamsType> & {
  collapsed: boolean
  onToggle: any
}

class AdminHeader extends React.Component<PropsType> {
  private handleLogout = () => {
    console.log(this.props)
    this.props.history.push('/login')
  }

  private renderDropDownMenu = () => {
    return (
      <Menu className="menu">
        <Menu.Item>
          <span onClick={() => this.props.history.push('/')}>返回主页</span>
        </Menu.Item>
        <Menu.Item>
          <span onClick={this.handleLogout}>退出登录</span>
        </Menu.Item>
      </Menu>
    )
  }

  public render() {
    const { collapsed } = this.props
    return (
      <div className="admin-header-container">
        <Icon
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          className="trigger"
          onClick={this.props.onToggle}
        />
        <div className="header-right">
          <Dropdown overlay={this.renderDropDownMenu()}>
            <span>
              <AuthorAvatar />
            </span>
          </Dropdown>
        </div>
      </div>
    )
  }
}

export default withRouter(AdminHeader)
