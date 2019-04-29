/*
 * @Description: 博客头部组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:43:47
 * @LastEditTime: 2019-04-29 15:07:00
 */

import React from 'react'
import { Layout, Row, Col } from 'antd'
import HeaderLeft from './HeaderLeft'
import HeaderSearch from './HeaderSearch'
import HeaderNav from './HeaderNav'
import './Header.less'

const Header = Layout.Header
const navList = [
  {
    icon: 'home',
    title: '首页',
    link: '/'
  },
  {
    icon: 'edit',
    title: '归档',
    link: '/archives'
  },
  {
    icon: 'folder',
    title: '分类',
    link: '/categories'
  },
  {
    icon: 'user',
    title: '关于',
    link: '/about'
  }
]

const BlogHeader = () => {
  const responsiveLeft = { xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24 }
  const responsiveRight = { xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0 }

  return (
    <Header className="header-contaienr">
      <Row>
        <Col {...responsiveLeft}>
          <HeaderLeft navList={navList} />
        </Col>
        <Col {...responsiveRight}>
          <HeaderSearch />
          <HeaderNav navList={navList} />
        </Col>
      </Row>
    </Header>
  )
}

export default BlogHeader
