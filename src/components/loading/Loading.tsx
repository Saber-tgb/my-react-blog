/*
 * @Description: Loading组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-08 17:34:43
 * @LastEditTime: 2019-05-08 17:59:39
 */
import React, { CSSProperties } from 'react'
import ReactDOM from 'react-dom'
import { Spin, Icon } from 'antd'
import { LoadingPic } from '@/constants/PictureConstants'

const loadingRoot: any = document.getElementById('component-loading')
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />
const SpinStyle: CSSProperties = {
  position: 'absolute',
  right: '20px',
  top: '20px'
}

export const SpinLoading: React.FC = () => {
  return ReactDOM.createPortal(
    <Spin indicator={antIcon} style={SpinStyle} />,
    loadingRoot
  )
}

// 图片 loading
const Loading: React.FC = () => (
  <img src={LoadingPic} alt="" className="loading" />
)

export default Loading
