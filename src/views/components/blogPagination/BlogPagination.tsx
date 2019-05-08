/*
 * @Description: 分页器
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-08 15:02:50
 * @LastEditTime: 2019-05-08 16:39:05
 */
import React from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'

interface IBlogPaginationStates {
  windowWidth: number
  total: number
  current: number
  pageSize: number
  onChange: any
}

class BlogPagination extends React.Component<IBlogPaginationStates> {
  static defaultProps = {
    pageSize: 10
  }
  public render() {
    const { total, current, onChange, pageSize } = this.props
    return (
      <div className="pagination">
        <Pagination
          current={current}
          onChange={onChange}
          total={total}
          pageSize={pageSize}
          // simple={this.props.windowWidth < 736}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  windowWidth: state.global.windowWidth
})

export default connect(mapStateToProps)(BlogPagination)
