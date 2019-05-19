/*
 * @Description: 编辑文章容器组件
 * @Author: tgb
 * @Date: 2019-05-17 10:41:39
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-17 15:18:39
 */
import { connect } from 'react-redux'
import Edit from './components/Edit'

const mapStateToProps = (state: any) => {
  return {
    colorList: state.global.colorList,
    tagList: state.article.tagList
  }
}

const EditContainer = connect(mapStateToProps)(Edit)

export default EditContainer
