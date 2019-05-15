/*
 * @Description: 文章UI组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:27:21
 * @LastEditTime: 2019-05-15 17:54:44
 */

import React, { Fragment } from 'react'
import { Icon, Divider, Drawer } from 'antd'
import Loading from '@/components/loading/Loading'
import Tags from '@/components/tags/Tags'
import Comment from '@/components/comment/Comment'
import ArticleNavigation from './ArticleNavigation'
import { getArticleContent } from '@/api'
import { translateMarkdown, getCommentsCount } from '@/utils'

interface IArticleProps {
  windowWidth: number
  drawerVisible: boolean
  openDrawer: any
  closeDrawer: any
  generateColorMap: any
  history: any
  match: any
}

interface IArticleStates {
  loading: boolean
  title: string
  content: string
  tags: string[]
  categories: string[]
  postTime: string
  commentList: string[]
}

class Article extends React.Component<IArticleProps, IArticleStates> {
  constructor(props: IArticleProps) {
    super(props)
    this.state = {
      loading: false,
      title: '',
      content: '',
      tags: ['react', 'javascript'],
      categories: [],
      postTime: '2019-01-01',
      commentList: []
    }
  }

  // 获取文章内容
  private fetchData = (id: number) => {
    this.setState({ loading: true })
    getArticleContent(id)
      .then((res: any) => {
        const content = translateMarkdown(res.data.content)
        const { title, createdAt, tags, categories, comments } = res.data
        this.props.generateColorMap(comments)
        this.setState({
          tags,
          categories,
          content,
          title,
          postTime: createdAt.slice(0, 10),
          commentList: comments,
          loading: false
        })
      })
      .catch(() => {
        this.props.history.push('/404')
      })
  }

  private setCommentList = (commentList: any[]) =>
    this.setState({ commentList })

  componentDidMount() {
    const id = this.props.match.params.id
    this.fetchData(id)
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      const id = nextProps.match.params.id
      this.fetchData(id)
    }
  }

  public render() {
    const {
      loading,
      title,
      postTime,
      tags,
      categories,
      commentList,
      content
    } = this.state
    const articleId = parseInt(this.props.match.params.id)

    return (
      <div className="content-inner-wrapper article">
        {loading ? (
          <Loading />
        ) : (
          <Fragment>
            <div className="post-header">
              <h1 className="post-title">{title}</h1>
              <div className="others">
                <i className="iconfont icon-post" />
                &nbsp; Posted on &nbsp;
                <span>{postTime}</span>
                <Tags type="tags" list={tags} />
                <Tags type="categories" list={categories} />
                <Divider type="vertical" />
                <Icon type="message" style={{ marginRight: 7 }} />
                {getCommentsCount(commentList)}
              </div>
            </div>

            <div
              className="article-detail"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* 浏览器窗口宽度大于1300 */}
            {this.props.windowWidth > 1300 ? (
              <div className="right-navigation">
                <ArticleNavigation content={content} />
              </div>
            ) : (
              <Fragment>
                <div className="drawer-btn" onClick={this.props.openDrawer}>
                  <Icon type="menu-o" className="nav-phone-icon" />
                </div>
                <Drawer
                  title={title}
                  placement="right"
                  closable={false}
                  onClose={this.props.closeDrawer}
                  visible={this.props.drawerVisible}
                >
                  <div className="right-navigation">
                    <ArticleNavigation content={content} />
                  </div>
                </Drawer>
              </Fragment>
            )}

            <Comment
              articleId={articleId}
              commentList={commentList}
              setCommentList={this.setCommentList}
            />
          </Fragment>
        )}
      </div>
    )
  }
}

export default Article

// import React from 'react'

// class Article extends React.Component {
//   public render() {
//     return <div>文章</div>
//   }
// }

// export default Article
