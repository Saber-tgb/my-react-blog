/*
 * @Description: 用户登录注册
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:50:44
 * @LastEditTime: 2019-05-15 17:12:57
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Menu, Button, Dropdown, Avatar } from 'antd';
import AuthModal from '@/components/authModal/AuthModal';
import { openAuthModal } from '@/redux/actions/global';
import { register, logout } from '@/redux/actions/user';

interface IHeaderUserInfoProps {
  openAuthModal: any;
  register: any;
  logout: any;
  username: string;
  avatarColor: string;
}
interface IHeaderUserInfoStates {}

class HeaderUserInfo extends React.Component<
  IHeaderUserInfoProps,
  IHeaderUserInfoStates
> {
  renderAvatarDropdownMenu = () => {
    return (
      <Menu>
        <Menu.Item>
          <span className="user-logout" onClick={this.props.logout}>
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    );
  };
  public render() {
    const { username, avatarColor } = this.props;

    return (
      <div className="header-userInfo">
        {username ? (
          <Dropdown
            placement="bottomCenter"
            overlay={this.renderAvatarDropdownMenu()}
            trigger={['click', 'hover']}
          >
            <Avatar
              className="user-avatar"
              size="large"
              style={{ backgroundColor: avatarColor }}
            >
              {username}
            </Avatar>
          </Dropdown>
        ) : (
          <Fragment>
            <Button
              ghost
              type="primary"
              size="small"
              style={{ marginRight: 20 }}
              onClick={() => this.props.openAuthModal('login')}
            >
              登录
            </Button>
            <Button
              ghost
              type="danger"
              size="small"
              onClick={() => this.props.openAuthModal('register')}
            >
              注册
            </Button>
          </Fragment>
        )}

        <AuthModal />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  username: state.user.username,
  avatarColor: state.user.avatarColor,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    openAuthModal: (type: any) => {
      dispatch(openAuthModal(type));
    },
    register: (username: string, password: string) => {
      dispatch(register(username, password));
    },
    logout: () => {
      dispatch(logout());
    },
    // openAuthModal,
    // register,
    // logout
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderUserInfo);
