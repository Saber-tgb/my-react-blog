/*
 * @Description: 标签列表容器组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:37:03
 * @LastEditTime: 2019-05-09 14:57:24
 */
import { connect } from 'react-redux'
import TagsList from './components/TagsList'

const mapStateToProps = (state: any) => {
  return {
    prop: state.prop
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    dispatch1: () => {
      dispatch()
    }
  }
}

const TagsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsList)

export default TagsListContainer
