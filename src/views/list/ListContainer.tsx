/*
 * @Description: 标签列表容器组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:37:03
 * @LastEditTime: 2019-04-29 17:48:48
 */
import { connect } from 'react-redux'
import List from './components/List'

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

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List)

export default ListContainer
