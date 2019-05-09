/*
 * @Description: 标签列表UI组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:27:21
 * @LastEditTime: 2019-05-09 14:56:16
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Timeline, Spin } from 'antd'
import BlogPagination from '@/views/components/blogPagination/BlogPagination'
import { getTagsArticlesList } from '@/api'

const TimeLineList = ({ list, name, type }: any) => {
  return (
    <div className="timeline">
      <Timeline>
        <Timeline.Item>
          <h1 className="list-title">
            {name}
            <small className="type-name">
              {' '}
              {type === 'categories' ? 'Category' : 'Tag'}
            </small>
          </h1>
          <br />
        </Timeline.Item>
        {list.map((item: any) => (
          <Timeline.Item key={item.id}>
            <span style={{ fontSize: '13px', marginRight: '16px' }}>
              {item.createdAt.slice(5, 10)}
            </span>
            <Link to={`/article/${item.id}`}>{item.title}</Link>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}
interface ITagsListProps {
  match: any
}
interface ITagsListStates {
  list: any[]
  page: number
  total: number
  type: string
  name: string
  loading: boolean
}

class TagsList extends React.Component<ITagsListProps, ITagsListStates> {
  constructor(props: ITagsListProps) {
    super(props)
    this.state = {
      list: [],
      page: 1,
      total: 0,
      type: 'categories',
      name: '',
      loading: false
    }
  }

  decodeQuery = (props: any) => {
    const type = props.location.pathname.includes('categories')
      ? 'categories'
      : 'tags'
    const name = props.match.params.name
    return { type, name }
  }

  // 获取调前列表
  private fetchList = ({ page = 1, name = '' }) => {
    this.setState({ loading: true })
    const params = { page, pageSize: 15, name }
    getTagsArticlesList(params)
      .then((res: any) => {
        this.setState({ list: res.rows, total: res.count, loading: false })
      })
      .catch(() => {
        this.setState({ loading: false })
      })
  }

  // 分页
  handlePageChange() {}

  componentDidMount() {
    console.log(this.props)
    const params = this.decodeQuery(this.props)
    console.log(params)
    this.fetchList({ page: 1, ...params })
    this.setState({ type: params.type })
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.match.params.name !== nextProps.match.params.name) {
      const params = this.decodeQuery(nextProps)
      this.fetchList({ page: 1, ...params })
    }
  }

  public render() {
    const { list, type, page, total, loading } = this.state
    const { name } = this.props.match.params
    return (
      <div className="content-inner-wrapper tags-list">
        <Spin tip="Loading..." spinning={loading}>
          <TimeLineList list={list} name={name} type={type} />
        </Spin>

        {/* 分页器 */}
        {list.length < total && (
          <BlogPagination
            current={page || 1}
            onChange={this.handlePageChange}
            total={total}
            pageSize={15}
          />
        )}
      </div>
    )
  }
}

export default TagsList
