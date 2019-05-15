/*
 * @Description: 首页UI组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:27:21
 * @LastEditTime: 2019-05-10 18:34:36
 */
import React, { Fragment } from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Divider, Icon, Empty, Drawer } from 'antd'
import { getArticleList } from '@/api'
import { translateMarkdown, getCommentsCount, decodeQuery } from '@/utils'
import Loading from '@/components/loading/Loading'
import Tags from '@/components/tags/Tags'
import BlogPagination from '@/components/blogPagination/BlogPagination'
import Preview from '@/components/preview/Preview'

interface INoDataDescProps {
  keyword?: string
}

const NoDataDesc: React.FC<INoDataDescProps> = (props) => (
  <Fragment>
    不存在标题中含有 <span className="keyword">{props.keyword}</span> 的文章！
  </Fragment>
)

type PathParamsType = {}

type HomePropsType = RouteComponentProps<PathParamsType> & {
  navList: any[]
  windowWidth: number
  drawerVisible: boolean
  openDrawer: any
  closeDrawer: any
}

interface IHomeStates {
  list: any[]
  total: number
  loading: boolean
}

class Home extends React.Component<HomePropsType, IHomeStates> {
  constructor(props: HomePropsType) {
    super(props)
    this.state = {
      list: [],
      total: 0,
      loading: false
    }
  }

  // 获取文章列表
  private _getArticleList({ page, keyword }: any) {
    this.setState({ loading: true })
    const params = {
      page,
      pageSize: 10,
      title: keyword
    }
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
  private jumpTo(id: number) {
    this.props.history.push(`/article/${id}`)
  }

  // 分页
  private handlePageChange = (page: number) => {
    // document.querySelector('.content-wrapper').scrollTop = 0
    let params = { ...decodeQuery(this.props.location.search), page }
    let url = ''
    Object.entries(params).forEach((item) => {
      url = !url ? `?${item[0]}=${item[1]}` : `${url}&${item[0]}=${item[1]}`
    })
    this.props.history.push(url)
  }

  componentDidMount() {
    const params = decodeQuery(this.props.location.search)
    this._getArticleList(params)
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.location.search !== nextProps.location.search) {
      const params = decodeQuery(nextProps.location.search)
      this._getArticleList(params)
    }
  }

  public render() {
    const { list, total, loading } = this.state
    const { page, keyword } = decodeQuery(this.props.location.search)
    return (
      <div className="content-inner-wrapper home">
        {loading ? (
          // loaidng动画
          <Loading />
        ) : (
          <Fragment>
            {/* 博客列表 */}
            <ul className="ul-list">
              {list.map((item: any) => (
                <li key={item.id} className="ul-list-item">
                  {/* 标题 */}
                  <Divider orientation="left">
                    <span
                      className="title"
                      onClick={() => this.jumpTo(item.id)}
                    >
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
            {list.length > 0 ? (
              <Fragment>
                {/* 分页器 */}
                {list.length < total && (
                  <BlogPagination
                    current={parseInt(page + '') || 1}
                    onChange={this.handlePageChange}
                    total={total}
                  />
                )}
                {/* 预览 */}
                {this.props.windowWidth > 1300 ? (
                  <Preview list={list} />
                ) : (
                  <Fragment>
                    <div className="drawer-btn" onClick={this.props.openDrawer}>
                      <Icon type="menu-o" className="nav-phone-icon" />
                    </div>
                    <Drawer
                      title="文章导航"
                      placement="right"
                      closable={false}
                      onClose={this.props.closeDrawer}
                      visible={this.props.drawerVisible}
                    >
                      <Preview list={list} />
                    </Drawer>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              // 没有数据
              <div className="no-data">
                <Empty description={<NoDataDesc keyword={keyword} />} />
              </div>
            )}
          </Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(Home)
