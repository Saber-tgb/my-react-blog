/*
 * @Description: 评论项组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-10 10:06:24
 * @LastEditTime: 2019-05-10 15:40:49
 */
import React from 'react'
import { Comment, Popconfirm, Icon, Tooltip, Input, Button } from 'antd'
import moment from 'moment'
import { translateMarkdown } from '@/utils'
const { TextArea } = Input

interface IBlogCommentItemProps {
  item: any
  openReply: any
  fatherId?: number
  levelOneId?: number
  levelTwoId?: number
  handleChange: any
  handleKeyUp: any
  onSubmit: any
  renderAvatar: any
  delComment: any
  auth: number
  value: string
}

const CommentItem: React.FC<IBlogCommentItemProps> = ({
  children,
  item,
  openReply,
  fatherId,
  levelOneId,
  levelTwoId,
  handleChange,
  handleKeyUp,
  onSubmit,
  renderAvatar,
  delComment,
  auth,
  value
}) => {
  const level = item.replies ? 1 : 2
  function handleClick(level: number) {
    if (level === 1) openReply(level, item.id)
    else openReply(level, item.id, fatherId)
  }
  const content = translateMarkdown(item.content)

  return (
    <Comment
      actions={[
        <span onClick={() => handleClick(level)}>Reply to</span>,
        <React.Fragment>
          {auth === 1 && (
            <Popconfirm
              title={'是否删除该评论？'}
              cancelText="取消"
              okText="确认"
              onConfirm={() => delComment(item, fatherId)}
            >
              <Icon type="delete" className="icon-delete" />
            </Popconfirm>
          )}
        </React.Fragment>
      ]}
      author={<span>{item.user && item.user.username}</span>}
      avatar={renderAvatar(item)}
      content={
        <div
          className="article-detail"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      }
      datetime={
        <Tooltip title={item.createdAt}>
          <span>{moment(item.createdAt).fromNow()}</span>
        </Tooltip>
      }
    >
      {((level === 1 && levelOneId === item.id) ||
        (level === 2 && levelTwoId === item.id)) && (
        <div className="reply-form">
          <TextArea
            placeholder={`回复${item.user.username}...`}
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <div className="reply-form-controls">
            <span className="tip">Ctrl or ⌘ + Enter</span>
            <Button
              htmlType="submit"
              type="primary"
              disabled={!value.trim()}
              onClick={onSubmit}
            >
              回复
            </Button>
          </div>
        </div>
      )}
      {children}
    </Comment>
  )
}

export default CommentItem
