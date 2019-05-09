/*
 * @Description: 预览组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-09 15:58:36
 * @LastEditTime: 2019-05-09 16:26:10
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Divider } from 'antd'

interface IPreviewProps {
  list: any[]
}

const Preview: React.FC<IPreviewProps> = (props) => (
  <ul className="preview">
    <Divider>预览</Divider>
    {props.list.map((item) => (
      <li key={item.id}>
        <Link to={`/article/${item.id}`}>{item.title}</Link>
      </li>
    ))}
  </ul>
)

export default Preview
