/*
 * @Description: 博客侧边栏组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 14:43:30
 * @LastEditTime: 2019-05-09 11:23:08
 */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Divider, Tag, Icon } from 'antd'
import { AuthorAvatar } from '@/constants/PictureConstants'
import { getArticleList } from '@/api'
import './Sidebar.less'

function random(colorList: any[]) {
  const len = colorList.length
  return Math.floor(Math.random() * len)
}

interface ISiderbarProps {
  tagList: any[]
  colorList: any[]
}
interface ISidebarState {
  recentArticleList: any[]
}

class Sidebar extends React.Component<ISiderbarProps, ISidebarState> {
  constructor(props: ISiderbarProps) {
    super(props)
    this.state = {
      recentArticleList: [] // 最近文章
    }
  }

  // 获取文章列表
  _getArticleList() {
    const params = { page: 1, pageSize: 6 }
    getArticleList(params).then((res: any) => {
      this.setState({ recentArticleList: res.rows })
    })
  }

  componentDidMount() {
    this._getArticleList()
  }

  public render() {
    const { tagList, colorList } = this.props
    const { recentArticleList } = this.state
    return (
      <div className="siderbar-wrapper">
        <img src={AuthorAvatar} className="sider-avatar" alt="头像" />
        <h2 className="name">Saber</h2>
        <div className="title">前端小兵，略微代码洁癖</div>
        <ul className="link-list">
          <li>
            <Icon type="github" />
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://github.com/Saber-tgb"
            >
              github
            </a>
          </li>
          <li>
            <i className="iconfont icon-juejin" />
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://juejin.im/user/58cba614570c3500589701b2"
            >
              juejin
            </a>
          </li>
        </ul>
        <Divider orientation="left">最近文章</Divider>
        <ul className="recent-list">
          {recentArticleList.map((d) => (
            <li key={d.id}>
              <Link to={`/article/${d.id}`}>{d.title}</Link>
            </li>
          ))}
        </ul>
        <Divider orientation="left">标签</Divider>
        <div className="tags-content">
          {tagList.map((tag, i) => (
            <Tag
              key={i}
              color={colorList[i] ? colorList[i] : colorList[random(colorList)]}
            >
              <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
            </Tag>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  tagList: state.article.tagList,
  colorList: state.global.colorList
})

export default connect(mapStateToProps)(Sidebar)
