/*
 * @Description: Admin管理后台布局主体容器
 * @Author: tgb
 * @Date: 2019-05-16 10:34:14
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-16 10:37:39
 */

import { connect } from 'react-redux'
import AdminLayout from './components/AdminLayout'

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

const AdminLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminLayout)

export default AdminLayoutContainer
