/*
 * @Description: 首页容器组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:37:03
 * @LastEditTime: 2019-04-29 15:40:07
 */
import { connect } from 'react-redux'
import Home from './components/Home'

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

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer
