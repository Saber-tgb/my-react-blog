import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import * as RouteConstant from '@/constants/RouteConstants'
import HomeContainer from '@/views/web/home/HomeContainer'

class App extends Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={HomeContainer} />
          <Route path={RouteConstant.WEB_PATH} component={HomeContainer} />
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
    dispatch1: () => {
      //   dispatch(actionCreator)
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
