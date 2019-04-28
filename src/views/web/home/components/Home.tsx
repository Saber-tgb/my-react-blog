import React from 'react'
import { Layout, Row, Col, BackTop } from 'antd'

class Home extends React.Component {
  public render() {
    const siderLayout = { xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0 }
    const contentLayout = { xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24 }

    return (
      <Layout className="app-container">
        {/* <Header /> */}
        <Row className="main-wrapper">
          <Col {...siderLayout}>{/* <BolgSider /> */}</Col>
          <Col {...contentLayout}>
            <div className="content-wrapper">111</div>
          </Col>
        </Row>
        <BackTop />
      </Layout>
    )
  }
}

export default Home
