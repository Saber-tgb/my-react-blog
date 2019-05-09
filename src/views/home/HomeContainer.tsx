/*
 * @Description: 首页容器组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:37:03
 * @LastEditTime: 2019-05-09 16:32:14
 */
import { connect } from 'react-redux'
import Home from './components/Home'

const mapStateToProps = (state: any) => {
  return {
    drawerVisible: state.global.drawerVisible,
    windowWidth: state.global.windowWidth
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
