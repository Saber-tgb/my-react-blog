/*
 * @Description: 评论组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-09 19:48:30
 * @LastEditTime: 2019-05-09 19:58:04
 */
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { getCommentsCount } from '@/utils'
import {
  Comment,
  Avatar,
  Form,
  Button,
  Divider,
  Input,
  Icon,
  Menu,
  Dropdown,
  message
} from 'antd'
import './BlogComment'

class BlogComment extends React.Component {
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
            <Editor
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

export default BlogComment
