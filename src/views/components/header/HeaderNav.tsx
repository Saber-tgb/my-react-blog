/*
 * @Description: 头部导航
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:50:20
 * @LastEditTime: 2019-05-06 16:50:30
 */
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'

type PathParamsType = {}

type PropsType = RouteComponentProps<PathParamsType> & {
  navList: any[]
}

class HeaderNav extends React.Component<PropsType> {
  public render() {
    const { navList } = this.props
    const mode = 'horizontal'
    const pathname = this.props.location.pathname
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

export default withRouter(HeaderNav)
