/*
 * @Description: 博客页面主体容器组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-28 16:01:28
 * @LastEditTime: 2019-05-09 16:32:01
 */
import { connect } from 'react-redux'
import Layout from './components/Layout'

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
)(Layout)

export default HomeContainer
