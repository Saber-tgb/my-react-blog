/*
 * @Description: 归档容器组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:37:03
 * @LastEditTime: 2019-05-09 10:29:50
 */
import { connect } from 'react-redux'
import Home from './components/Archives'

const mapStateToProps = (state: any) => {
  return {
    categoryList: state.article.categoryList,
    colorList: state.global.colorList
  }
}

const HomeContainer = connect(mapStateToProps)(Home)

export default HomeContainer
