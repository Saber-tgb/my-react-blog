/*
 * @Description: 归档UI组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:27:21
 * @LastEditTime: 2019-05-08 19:31:48
 */
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Timeline, Icon, Spin } from 'antd'
import BlogPagination from '@/views/components/blogPagination/BlogPagination'
import { getArticleList } from '@/api'
import { groupBy } from '@/utils'

interface IArchivesProps {}
interface IArchivesStates {
  list: any[]
  total: number
  current: number
  loading: boolean
}

class Archives extends React.Component<IArchivesProps, IArchivesStates> {
  constructor(props: IArchivesProps) {
    super(props)
    this.state = {
      list: [],
      total: 0,
      current: 1,
      loading: false
    }
  }

  _getArticleList({ page = 1 }) {
    this.setState({ loading: true })
    const params = { page, pageSize: 15 }
    getArticleList(params)
      .then((res: any) => {
        const list = groupBy(res.rows, (item: any) =>
          item.createdAt.slice(0, 4)
        )
        this.setState({ list, total: res.count, loading: false })
      })
      .catch(() => {
        this.setState({ loading: false })
      })
  }

  // 分页查询
  handlePageChange = (page: number) => {
    this._getArticleList({ page: page })
    this.setState({ current: page })
  }

  componentDidMount() {
    this._getArticleList({ page: 1 })
  }

  public render() {
    const { list, total, loading, current } = this.state

    return (
      <div className="content-inner-wrapper archives">
        <Spin tip="Loading..." spinning={loading}>
          <Timeline>
            {list.map((d, i) => (
              <Fragment key={i}>
                {i === 0 && (
                  // 鼓励
                  <Timeline.Item>
                    <span className="desc">{`Nice! ${total} posts in total. Keep on posting.`}</span>
                    <br />
                    <br />
                  </Timeline.Item>
                )}

                <Timeline.Item
                  dot={
                    <Icon type="clock-circle-o" style={{ fontSize: '16px' }} />
                  }
                  color="red"
                >
                  <div className="year">
                    {d[0]['createdAt'].slice(0, 4)}
                    ...
                  </div>
                  <br />
                </Timeline.Item>

                {d.map((item: any) => (
                  <Timeline.Item key={item.id}>
                    <span style={{ fontSize: '13px', marginRight: '16px' }}>
                      {item.createdAt.slice(5, 10)}
                    </span>
                    <Link to={`/article/${item.id}`}>{item.title}</Link>
                  </Timeline.Item>
                ))}
              </Fragment>
            ))}
          </Timeline>

          {/* 分页器 */}
          {list.length < total && (
            <BlogPagination
              current={current || 1}
              onChange={this.handlePageChange}
              total={total}
              pageSize={15}
            />
          )}
        </Spin>
      </div>
    )
  }
}

export default Archives
