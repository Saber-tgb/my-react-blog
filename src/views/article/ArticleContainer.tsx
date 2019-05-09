/*
 * @Description: 文章容器组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:37:03
 * @LastEditTime: 2019-05-09 15:52:53
 */
import { connect } from 'react-redux'
import Article from './components/Article'
import {
  openDrawer,
  closeDrawer,
  generateColorMap
} from '@/redux/actions/global'

const mapStateToProps = (state: any) => {
  return {
    windowWidth: state.global.windowWidth,
    drawerVisible: state.global.drawerVisible
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    openDrawer: () => {
      dispatch(openDrawer())
    },
    closeDrawer: () => {
      dispatch(closeDrawer())
    },
    generateColorMap: (commentList: any) => {
      dispatch(generateColorMap(commentList))
    }
  }
}

const ArticleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Article)

export default ArticleContainer
