/*
 * @Description: 头部搜索组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:50:06
 * @LastEditTime: 2019-05-06 14:56:52
 */

import React from 'react'
import { Input, Icon, Row, Col } from 'antd'
interface IHeaderSearchState {
  keyword: ''
}

class HeaderSearch extends React.Component<{}, IHeaderSearchState> {
  constructor(props: any) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  handleChange = (e: any) => this.setState({ keyword: e.target.value })
  handleSubmit() {}

  handlePressEnter() {}

  public render() {
    return (
      <Row className="header-search-box">
        <Col>
          <Icon type="search" className="anticon" />
          <Input
            type="text"
            value={this.state.keyword}
            onChange={this.handleChange}
            onBlur={this.handleSubmit}
            onPressEnter={this.handlePressEnter}
            className="header-search"
            placeholder="搜索文章"
            style={{ width: 200 }}
          />
        </Col>
      </Row>
    )
  }
}

export default HeaderSearch
