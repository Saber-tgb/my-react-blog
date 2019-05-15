/*
 * @Description: 关于容器组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:37:03
 * @LastEditTime: 2019-05-10 16:00:44
 */
import { connect } from 'react-redux'
import About from './components/About'
import { generateColorMap } from '@/redux/actions/global'

const mapStateToProps = (state: any) => {
  return {
    prop: state.prop
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    generateColorMap: (commentList: any) => {
      dispatch(generateColorMap(commentList))
    }
  }
}

const AboutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(About)

export default AboutContainer
