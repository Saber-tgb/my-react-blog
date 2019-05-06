/*
 * @Description: 用户登录注册
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:50:44
 * @LastEditTime: 2019-05-06 14:30:53
 */
import React, { Fragment } from 'react'

import { Button } from 'antd'

class HeaderUserInfo extends React.Component {
  public render() {
    return (
      <div className="header-userInfo">
        <Fragment>
          <Button ghost type="primary" size="small" style={{ marginRight: 20 }}>
            登录
          </Button>
          <Button ghost type="danger" size="small">
            注册
          </Button>
        </Fragment>
      </div>
    )
  }
}

export default HeaderUserInfo
