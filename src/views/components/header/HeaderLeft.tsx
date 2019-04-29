/*
 * @Description: HeaderLeft
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:49:53
 * @LastEditTime: 2019-04-29 14:32:05
 */
import React from 'react'
import { Icon, Dropdown, Menu } from 'antd'
import { Link } from 'react-router-dom'

const Item = Menu.Item

const HeaderLeft = ({ navList }: any) => {
  const menu = (
    <Menu className="header-nav">
      {navList.map((nav: any) => (
        <Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <Icon type={nav.icon} style={{ marginRight: 15 }} />}
            <span className="nav-text">{nav.title}</span>
          </Link>
        </Item>
      ))}
    </Menu>
  )

  return (
    <div className="header-left">
      <i className="iconfont icon-airplane" style={{ color: '#055796' }} />
      <span className="blog-name">Saber的博客</span>
      <Dropdown
        overlayClassName="header-dropdown"
        trigger={['click']}
        overlay={menu}
      >
        <Icon type="menu-o" className="nav-phone-icon" />
      </Dropdown>
    </div>
  )
}

export default HeaderLeft
