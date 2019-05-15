/*
 * @Description: 博客评论编辑组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-10 15:09:55
 * @LastEditTime: 2019-05-10 15:20:10
 */
import React from 'react'
import { Form, Input, Button } from 'antd'

const { Item } = Form
const { TextArea } = Input

interface ICommentEditorProps {
  onChange: any
  onSubmit: any
  submitting: any
  value: string
  articleId: number
}

const CommentEditor: React.FC<ICommentEditorProps> = ({
  onChange,
  onSubmit,
  submitting,
  value,
  articleId
}) => (
  <div>
    <Item>
      <TextArea
        rows={4}
        placeholder="说点什么..."
        onChange={onChange}
        value={value}
      />
    </Item>
    <Item>
      <div className="controls">
        <i className="iconfont icon-tips" />
        <span className="support-tip">支持 Markdown 语法</span>
        <Button
          className=""
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          {articleId !== -1 ? '添加评论' : '留言'}
        </Button>
      </div>
    </Item>
  </div>
)

export default CommentEditor
