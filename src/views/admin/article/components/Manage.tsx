/*
 * @Description: 管理文章
 * @Author: tgb
 * @Date: 2019-05-17 09:52:57
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-17 10:26:34
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Divider, Tag, Modal, message, Badge } from 'antd'
import QueryForm from './QueryForm'
import moment from 'moment'
import { getArticleList, deleteArticle } from '@/api'
import { random, getCommentsCount } from '@/utils'

interface IManageProps {
  colorList: any[]
  tagList: any[]
}
interface IManageStates {
  query: any
  colorMap: any
  list: any[]
  pagination: any
  total: number
  loading: boolean
}

class Manage extends React.Component<IManageProps, IManageStates> {
  constructor(props: IManageProps) {
    super(props)
    this.state = {
      query: null,
      colorMap: {},
      list: [],
      pagination: {},
      total: 0,
      loading: false
    }
  }

  // 生产表格
  private getColumns = () => {
    return [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '标签',
        dataIndex: 'tags',
        render: (text: any[]) => {
          return text.map((d: any) => (
            <Tag color={this.state.colorMap[d.name]} key={d.name}>
              {d.name}
            </Tag>
          ))
        }
      },
      {
        title: '分类',
        dataIndex: 'categories',
        render: (text: any[]) => {
          return text.map((d: any) => (
            <Tag color={'#2db7f5'} key={d.name}>
              {d.name}
            </Tag>
          ))
        }
      },
      {
        title: '评论数',
        dataIndex: 'comments',
        render: (text: any[]) => {
          const count = getCommentsCount(text)
          return count !== 0 ? (
            <Badge count={count} style={{ backgroundColor: '#52c41a' }} />
          ) : (
            count
          )
        },
        sorter: (a: any, b: any) =>
          getCommentsCount(a.comments) - getCommentsCount(b.comments)
      },
      {
        title: '发布时间',
        dataIndex: 'createdAt',
        sorter: (a: any, b: any) =>
          moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1
      },
      {
        title: '修改时间',
        dataIndex: 'updatedAt',
        sorter: (a: any, b: any) =>
          moment(a.updatedAt).isBefore(b.updatedAt) ? 1 : -1
      },
      {
        title: '操作',
        render: (text: any[], record: any) => {
          return (
            <div className="action">
              <Link to={`/article/${record.id}`}>查看</Link>
              <Divider type="vertical" />
              {/* <span className="btn-edit">编辑</span> */}
              <Link
                to={{
                  pathname: '/admin/articles/edit',
                  state: { articleId: record.id }
                }}
              >
                编辑
              </Link>
              <Divider type="vertical" />
              <span
                className="btn-delete"
                onClick={() => this.handleDelete(record.id, record.title)}
              >
                删除
              </span>
            </div>
          )
        }
      }
    ]
  }

  // 查询
  private getQuery = (query: any) => {
    this.setState({ query })

    this.fetchList({ ...query, current: 1 })
  }

  // 搜索文章列表
  private fetchList = ({ current = 1, pageSize = 10, ...query }) => {
    this.setState({ loading: true })
    const params = { page: current, pageSize, ...query }
    getArticleList(params).then((res: any) => {
      const pagination = {
        current,
        pageSize,
        total: res.count
      }
      this.setState({ list: res.rows, pagination, loading: false })
    })
  }

  // 删除文章
  private handleDelete = (articleId: number, title: string) => {
    Modal.confirm({
      title: '您确认删除该文章?，此操作不可恢复！',
      content: `文章： ${title} `,
      onOk: () => {
        deleteArticle({ articleId }).then((res: any) => {
          if (res.code === 200) {
            this.fetchList(this.state.pagination)
            message.success(res.message)
          }
        })
      }
    })
  }

  private handleChange = (pagination: any) => {
    this.fetchList({ ...pagination, ...this.state.query })
  }

  componentDidMount() {
    const { colorList, tagList } = this.props
    let colorMap = {}
    tagList.forEach((item: any) => {
      colorMap[item.name] = colorList[random(colorList)]
    })
    this.setState({ colorMap }, () => this.fetchList({ page: 1 }))
  }

  public render() {
    const { list, pagination, loading } = this.state
    return (
      <div className="manager">
        <QueryForm getQuery={this.getQuery} />
        <Table
          rowKey="id"
          bordered
          loading={loading}
          columns={this.getColumns()}
          dataSource={list}
          pagination={pagination}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Manage
