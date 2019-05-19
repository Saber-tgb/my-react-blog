/*
 * @Description: 后台管理登录页面
 * @Author: tgb
 * @Date: 2019-05-16 14:43:51
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-17 15:45:53
 */
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, message, Input, Icon } from 'antd'
import { login } from '@/redux/actions/user'
import { LogoPic } from '@/constants/PictureConstants'

interface ILoginProps extends RouteComponentProps {
  login: any
  auth: any
}
interface ILoginStates {
  username: string
  password: number | string
}

class Login extends React.Component<ILoginProps, ILoginStates> {
  constructor(props: ILoginProps) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  private handleChange = (e: any) => {
    const targetName = e.target.name
    const value = e.target.value
    if (targetName === 'username') {
      this.setState({ username: value })
    } else {
      this.setState({ password: value })
    }
  }

  private handleSubmit = async () => {
    await this.props.login(this.state)
    if (this.props.auth === 1) {
      this.props.history.push('/admin')
      message.success('登录成功')
    } else if (this.props.auth === 2) {
      message.warning('您的权限不足！')
    }
  }

  public render() {
    return (
      <div className="login-container">
        <div className="login-form">
          <img src={LogoPic} alt="" className="App-logo" />
          <Input
            size="large"
            style={{ marginBottom: 25 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Input
            size="large"
            style={{ marginBottom: 25 }}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button
            style={{ width: '100%' }}
            size="large"
            type="primary"
            onClick={this.handleSubmit}
          >
            登录
          </Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    auth: state.user.auth
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (params: any) => {
      const { username, password } = params
      return dispatch(login(username, password))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login))
