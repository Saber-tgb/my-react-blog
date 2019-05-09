/*
 * @Description: 头部搜索组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:50:06
 * @LastEditTime: 2019-05-09 19:35:44
 */

import React from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Input, Icon, Row, Col } from 'antd'
interface IHeaderSearchState {
  keyword: ''
}

class HeaderSearch extends React.Component<
  RouteComponentProps,
  IHeaderSearchState
> {
  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {
      keyword: ''
    }
  }

  handleChange = (e: any) => this.setState({ keyword: e.target.value })

  handleSubmit = () => {
    const keyword = this.state.keyword
    if (keyword) this.props.history.push(`/?page=1&keyword=${keyword}`)
  }

  handlePressEnter(e: any) {
    e.target.blur()
  }

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

export default withRouter(HeaderSearch)
