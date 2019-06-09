/*
 * @Description: 评论组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-09 19:48:30
 * @LastEditTime: 2019-05-15 18:55:36
 */
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Comment, Avatar, Divider, Menu, Icon, Dropdown, message } from 'antd'
import AuthorAvatar from '@/components/authorAvatar/AuthorAvatar'
import CommentEditor from './CommentEditor'
import CommentList from './CommentList'
import { openAuthModal } from '@/redux/actions/global'
import { logout } from '@/redux/actions/user'
import { postUserComment } from '@/api'
import { getCommentsCount } from '@/utils'
import './Comment.less'

interface ICommentProps {
  username?: string
  articleId: number
  userId?: number
  commentList: any[]
  openAuthModal: any
  logout: any
  setCommentList: any
}
interface ICommentStates {
  submitting: boolean
  value: string
}

class BlogComment extends React.Component<ICommentProps, ICommentStates> {
  constructor(props: ICommentProps) {
    super(props)
    this.state = {
      submitting: false,
      value: ''
    }
  }

  // 提交评论
  handleSubmit = () => {
    if (!this.state.value) {
      return
    }
    if (!this.props.username) {
      message.warn('您未登陆，请登录后再试。')
      return
    }
    this.setState({ submitting: true })
    const params = {
      articleId: this.props.articleId,
      content: this.state.value
    }
    postUserComment(params)
      .then((res: any) => {
        this.setState({ submitting: false, value: '' }, () =>
          this.props.setCommentList(res.rows)
        )
      })
      .catch(() => this.setState({ submitting: false }))
  }

  handleChange = (e: any) => {
    this.setState({ value: e.target.value })
  }

  handleMenuClick = (e: any) => {
    switch (e.key) {
      case 'login':
        this.props.openAuthModal('login')
        break
      case 'register':
        this.props.openAuthModal('register')
        break
      case 'logout':
        this.props.logout()
        break
      default:
        break
    }
  }

  // 渲染登录注册下拉框
  renderDropdownMenu = () => {
    const { username } = this.props
    return username ? (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="logout">注销</Menu.Item>
      </Menu>
    ) : (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="login">登录</Menu.Item>
        <Menu.Item key="register">注册</Menu.Item>
      </Menu>
    )
  }

  public render() {
    const { submitting, value } = this.state
    const { username, articleId, userId, commentList } = this.props

    return (
      <div className="comment-wrapper">
        {/* 评论组件头部 */}
        <div className="comment-header">
          <span className="count">{getCommentsCount(commentList)}</span>{' '}
          {articleId !== -1 ? '条评论' : '条留言'}
          <span className="menu-wrap">
            <Dropdown
              overlay={this.renderDropdownMenu()}
              trigger={['click', 'hover']}
            >
              <span>
                {username ? username : '未登录用户'} <Icon type="down" />
              </span>
            </Dropdown>
          </span>
          <Divider className="hr" />
        </div>

        <Comment
          avatar={
            username ? (
              <Fragment>
                {userId !== 1 ? (
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                ) : (
                  <AuthorAvatar />
                )}
              </Fragment>
            ) : (
              <Icon
                type="github"
                theme="filled"
                style={{ fontSize: 40, margin: '5px 5px 0 0' }}
              />
            )
          }
          content={
            <CommentEditor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
              articleId={articleId}
            />
          }
        />

        <CommentList
          commentList={commentList}
          articleId={articleId}
          setCommentList={this.props.setCommentList}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    username: state.user.username,
    userId: state.user.userId
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    openAuthModal: (type: any) => {
      dispatch(openAuthModal(type))
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogComment)
