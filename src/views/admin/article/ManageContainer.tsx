/*
 * @Description: 管理文章容器组件
 * @Author: tgb
 * @Date: 2019-05-17 09:36:09
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-17 10:00:05
 */

import { connect } from 'react-redux'
import Manage from './components/Manage'

const mapStateToProps = (state: any) => {
  return {
    colorList: state.global.colorList,
    tagList: state.article.tagList
  }
}

const ManageContainer = connect(mapStateToProps)(Manage)

export default ManageContainer
