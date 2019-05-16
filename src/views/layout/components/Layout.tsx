/*
 * @Description: 博客布局主体
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:27:21
 * @LastEditTime: 2019-05-16 10:38:22
 */
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Layout, Row, Col, BackTop } from 'antd'
import Header from '@/components/header/Header'
import SideBar from '@/components/sidebar/Sidebar'
import LayoutRoute from './LayoutRoute'

type PathParamsType = {}

type PropsType = RouteComponentProps<PathParamsType> & {}

class BlogLayout extends React.Component<PropsType> {
  public render() {
    const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
    const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }

    return (
      <Layout className="app-container">
        <Header />
        <Row className="main-wrapper">
          <Col {...siderLayout}>
            <SideBar />
          </Col>
          <Col {...contentLayout}>
            <div className="content-wrapper">
              <LayoutRoute />
            </div>
          </Col>
        </Row>
        <BackTop
          target={(): any => document.querySelector('.content-wrapper')}
        />
      </Layout>
    )
  }
}

export default withRouter(BlogLayout)
