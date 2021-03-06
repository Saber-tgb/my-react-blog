/*
 * @Description: 博客布局主体容器
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-28 16:01:28
 * @LastEditTime: 2019-05-16 10:38:18
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
