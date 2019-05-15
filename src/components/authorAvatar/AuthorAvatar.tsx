/*
 * @Description: 作者头像组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-06 16:45:49
 * @LastEditTime: 2019-05-06 17:28:01
 */
import React from 'react'
import { Avatar } from 'antd'
import { AuthorAvatar } from '@/constants/PictureConstants'

enum EnumSize {
  Large = 'large',
  Small = 'small',
  Default = 'default'
}

const AuthAvatar = ({ size = EnumSize.Default }) => {
  return <Avatar src={AuthorAvatar} size={size} />
}

export default AuthAvatar
