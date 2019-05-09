/*
 * @Description: 分类容器组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 15:37:03
 * @LastEditTime: 2019-05-09 10:54:46
 */
import { connect } from 'react-redux'
import Home from './components/Categories'

const mapStateToProps = (state: any) => {
  return {
    // 分类列表
    categoryList: state.article.categoryList,
    colorList: state.global.colorList
  }
}

const HomeContainer = connect(mapStateToProps)(Home)

export default HomeContainer
