/*
 * @Description: 头部导航
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:50:20
 * @LastEditTime: 2019-04-29 14:37:30
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

interface IHeaderNavProps {
  navList: any[]
  location?: any
}
class HeaderNav extends React.Component<IHeaderNavProps> {
  public render() {
    const { navList } = this.props
    const mode = 'horizontal'
    const pathname = 'path'
    return (
      <Menu mode={mode} selectedKeys={[pathname]} className="header-nav">
        {navList.map((nav: any) => (
          <Menu.Item key={nav.link}>
            <Link to={nav.link}>
              {nav.icon && <Icon type={nav.icon} />}
              <span className="nav-text">{nav.title}</span>
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    )
  }
}

export default HeaderNav
