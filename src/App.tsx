/*
 * @Description: 根组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-07 14:50:45
 * @LastEditTime: 2019-05-17 15:32:09
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import * as RouteConstant from '@/constants/RouteConstants'
import AdminLayoutContainer from '@/views/admin/layout/AdminLayoutContainer'
import LayoutContainer from '@/views/layout/LayoutContainer'
import Login from '@/views/admin/login/Login'
import { getTagsList, getCategoriesList } from '@/redux/actions/article'
import { getWindowWidth } from '@/redux/actions/global'

interface IAppProps {
  getTagsList: any
  getCategoriesList: any
  getWindowWidth: any
}

class App extends Component<IAppProps> {
  componentDidMount() {
    this.props.getTagsList()
    this.props.getCategoriesList()
    this.props.getWindowWidth()
  }

  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={LayoutContainer} />
          <Route
            path={RouteConstant.ADMIN_PATH}
            component={AdminLayoutContainer}
          />
          <Route path={RouteConstant.LOGIN_PATH} component={Login} />
          <Route path={RouteConstant.WEB_PATH} component={LayoutContainer} />
          <Redirect to={RouteConstant.NOT_FOUNT_PATH} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    prop: state.prop
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getTagsList: () => {
      dispatch(getTagsList())
    },
    getCategoriesList: () => {
      dispatch(getCategoriesList())
    },
    getWindowWidth: () => {
      dispatch(getWindowWidth())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
