/*
 * @Description: 文章UI组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:27:21
 * @LastEditTime: 2019-05-08 19:00:50
 */
import React, { Fragment } from 'react'
import { Icon, Divider } from 'antd'
import Loading from '@/views/components/loading/Loading'
import Tags from '@/views/components/tags/Tags'
import { getCommentsCount } from '@/utils'

interface IArticleProps {}

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

  public render() {
    const {
      loading,
      title,
      postTime,
      tags,
      categories,
      commentList
    } = this.state

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
          </Fragment>
        )}
      </div>
    )
  }
}

export default Article
