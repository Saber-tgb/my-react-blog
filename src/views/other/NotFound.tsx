/*
 * @Description: 404页面
 * @Author: tgb
 * @Date: 2019-05-15 11:11:53
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-15 11:19:52
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { NotFoundPic } from '@/constants/PictureConstants'

const NotFound: React.FC = () => {
  return (
    <div className="not-found-wrapper">
      <img src={NotFoundPic} alt="404" className="green-man" />
      <i
        className="iconfont icon-back"
        style={{ color: 'green', marginRight: 6 }}
      />
      <Link to="/">返回首页</Link>
    </div>
  )
}

export default NotFound
