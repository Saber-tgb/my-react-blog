/*
 * @Description: Admin管理后台布局主体
 * @Author: tgb
 * @Date: 2019-05-16 10:35:11
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-17 10:38:49
 */

import React from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd'
import AdminHeader from './AdminHeader'
import AdminSideBarNav from './AdminSideBarNav'
import AdminRoutes from './AdminRoutes'

const { Sider, Header, Content } = Layout

interface IAdminLayoutStates {
  collapsed: boolean
}

class AdminLayout extends React.Component<
  RouteComponentProps,
  IAdminLayoutStates
> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      collapsed: false
    }
  }

  private toggle = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed
    }))
  }

  public render() {
    return (
      <div className="admin-container">
        <Layout>
          <Sider collapsible trigger={null} collapsed={this.state.collapsed}>
            <AdminSideBarNav />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px' }}>
              <AdminHeader
                collapsed={this.state.collapsed}
                onToggle={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}
            >
              <AdminRoutes />
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

export default withRouter(AdminLayout)
