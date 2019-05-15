/*
 * @Description: 评论列表
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-09 19:58:16
 * @LastEditTime: 2019-05-10 18:34:32
 */

import React from 'react'
import { connect } from 'react-redux'
import { message, Avatar } from 'antd'
import AuthorAvatar from '@/components/authorAvatar/AuthorAvatar'
import CommentItem from './CommentItem'
import { postUserReply, deleteUserComment, deleteUserReply } from '@/api'

interface IBlogCommentListProps {
  userId: number
  username: string
  articleId: number
  commentList: any[]
  auth: any
  colorMap: object
  setCommentList: any
}
interface IBlogCommentListStates {
  commentList: any[]
  colorMap: object
  commentId: number
  levelOneId: number
  levelTwoId: number
  value: string
}

class BlogCommentList extends React.Component<
  IBlogCommentListProps,
  IBlogCommentListStates
> {
  constructor(props: IBlogCommentListProps) {
    super(props)
    this.state = {
      commentList: [],
      colorMap: {},
      commentId: 0,
      levelOneId: 0, // 一级激活 id 用于判断评论框的显示
      levelTwoId: 0, // 二级激活 id
      value: ''
    }
  }

  renderAvatar = (item: any) => {
    const { userId, colorMap } = this.props
    if (item.userId === 1) return <AuthorAvatar /> // userId = 1 博主~~~
    if (item.userId === userId) {
      return (
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      )
    } else {
      return (
        <Avatar
          className="user-avatar"
          size="default"
          style={{ backgroundColor: colorMap[item.userId] || '#ccc' }}
        >
          {item.user && item.user.username}
        </Avatar>
      )
    }
  }

  openReply = (level: number, id: number, commentId: number) => {
    if (level === 1) {
      this.setState({ commentId: id, levelTwoId: 0, levelOneId: id })
    } else {
      this.setState({ levelOneId: 0, levelTwoId: id, commentId })
    }
  }

  handleChange = (e: any) => {
    this.setState({ value: e.target.value })
  }

  handleKeyUp = (e: any) => {
    if (e.ctrlKey && e.keyCode === 13) {
      this.onSubmit()
    }
  }

  // 登录
  onSubmit = () => {
    const content = this.state.value.trim()
    if (!this.props.username) {
      message.warn('您未登陆，请登录后再试。')
      return
    }
    const { articleId } = this.props
    const params = {
      content,
      articleId,
      commentId: this.state.commentId
    }
    postUserReply(params).then((res: any) => {
      this.props.setCommentList(res.rows)
      this.setState({ commentId: 0, levelOneId: 0, levelTwoId: 0, value: '' })
    })
  }

  // 删除评论
  delComment = (item: any, commentId: number) => {
    if (item.replies) {
      const params = {
        commentId: item.id
      }
      deleteUserComment(params).then((res: any) => {
        if (res.code !== 200) {
          message.error(res.message)
          return
        }
        const list = this.props.commentList.filter((d) => d.id !== item.id)
        this.props.setCommentList(list)
        message.success(res.message)
      })
    } else {
      const params = { replyId: item.id }
      deleteUserReply(params).then((res: any) => {
        if (res.code !== 200) {
          message.error(res.message)
          return
        }
        const list = [...this.props.commentList]
        list.forEach((d) => {
          if (d.id === commentId)
            d.replies = d.replies.filter((v: any) => v.id !== item.id)
        })
        this.props.setCommentList(list)
        message.success(res.message)
      })
    }
  }

  public render() {
    const { commentList, auth } = this.props
    const { levelOneId, value, levelTwoId } = this.state
    const commonProps = {
      value,
      auth,
      renderAvatar: this.renderAvatar,
      openReply: this.openReply,
      handleChange: this.handleChange,
      handleKeyUp: this.handleKeyUp,
      onSubmit: this.onSubmit,
      delComment: this.delComment
    }
    return (
      <div>
        {commentList.map((comment) => (
          <CommentItem
            key={comment.id}
            item={comment}
            levelOneId={levelOneId}
            {...commonProps}
          >
            {comment.replies.map((reply: any) => (
              <CommentItem
                key={reply.id}
                item={reply}
                levelTwoId={levelTwoId}
                fatherId={comment.id}
                {...commonProps}
              />
            ))}
          </CommentItem>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    username: state.user.username,
    userId: state.user.userId,
    auth: state.user.auth,
    colorMap: state.global.colorMap
  }
}

export default connect(mapStateToProps)(BlogCommentList)
