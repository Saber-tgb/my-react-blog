/*
 * @Description: 首页UI组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:27:21
 * @LastEditTime: 2019-05-07 19:12:38
 */
import React, { Fragment } from 'react'
import { Divider, Icon } from 'antd'
import { getArticleList } from '@/api'
import { translateMarkdown, getCommentsCount } from '@/utils'
import Tags from '@/views/components/tags/Tags'

interface IHomeProps {
  props: any
}
interface IHomeStates {
  list: any[]
  total: number
  loading: boolean
}

class Home extends React.Component<IHomeProps, IHomeStates> {
  constructor(props: IHomeProps) {
    super(props)
    this.state = {
      list: [],
      total: 0,
      loading: false
    }
  }

  // 获取文章列表
  private _getArticleList() {
    const params = { page: 1, pageSize: 10, title: 222 }
    getArticleList(params)
      .then((res: any) => {
        const list = res.rows
        // 处理 read more 的内容
        list.forEach((item: any) => {
          let index = item.content.indexOf('<!--more-->')
          item.description = translateMarkdown(item.content.slice(0, index))
        })
        this.setState({ list, total: res.count, loading: false })
      })
      .catch(() => this.setState({ loading: false }))
  }
  // 跳转文章详情
  private jumpTo(id: number) {}

  componentDidMount() {
    this._getArticleList()
  }

  public render() {
    const { list } = this.state
    return (
      <div className="content-inner-wrapper home">
        <Fragment>
          <ul className="ul-list">
            {list.map((item: any) => (
              <li key={item.id} className="ul-list-item">
                {/* 标题 */}
                <Divider orientation="left">
                  <span className="title" onClick={() => this.jumpTo(item.id)}>
                    {item.title}
                  </span>
                  <span className="create-time">
                    {item.createdAt.slice(0, 10)}
                  </span>
                </Divider>
                {/* 内容 */}
                <div
                  onClick={() => this.jumpTo(item.id)}
                  className="article-detail description"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                {/* 标签 */}
                <div className="list-item-action">
                  <Icon type="message" style={{ marginRight: 7 }} />
                  {getCommentsCount(item.comments)}
                  <Tags type="tags" list={item.tags} />
                  <Tags type="categories" list={item.categories} />
                </div>
              </li>
            ))}
          </ul>
        </Fragment>
      </div>
    )
  }
}

export default Home
