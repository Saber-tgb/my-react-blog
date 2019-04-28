/*
 * @Description: 博客页面主体布局模块
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-28 16:01:28
 * @LastEditTime: 2019-04-28 19:21:51
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
