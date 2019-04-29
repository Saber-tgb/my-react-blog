/*
 * @Description: 博客主题UI组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:27:21
 * @LastEditTime: 2019-04-29 17:54:16
 */
import React from 'react'
import { Layout, Row, Col, BackTop } from 'antd'
import Header from '@/views/components/header/Header'
import SideBar from '@/views/components/sidebar/Sidebar'
import LayoutRoute from './LayoutRoute'

class BlogLayout extends React.Component {
  public render() {
    const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
    const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }

    return (
      <Layout className="app-container">
        <Header />
        <Row className="main-wrapper">
          <Col {...siderLayout}>
            <SideBar tagList={[]} colorList={[]} />
          </Col>
          <Col {...contentLayout}>
            <div className="content-wrapper">
              <LayoutRoute />
            </div>
          </Col>
        </Row>
        <BackTop />
      </Layout>
    )
  }
}

export default BlogLayout
