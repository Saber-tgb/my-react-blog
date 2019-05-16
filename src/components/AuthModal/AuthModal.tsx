/*
 * @Description: 登录框
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-10 16:58:58
 * @LastEditTime: 2019-05-15 17:18:20
 */
import React from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Icon, Button, Form } from 'antd';
import { closeAuthModal } from '@/redux/actions/global';
import { login, register } from '@/redux/actions/user';
import FormBuilder from '@/components/helper/FormBuilder';

const formMeta = {
  elements: [
    {
      key: 'username',
      widget: (
        <Input
          placeholder="Username"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      ),
      rules: [{ required: true, message: 'Username is required' }],
    },
    {
      key: 'password',
      widget: (
        <Input
          placeholder="Password"
          type="password"
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
        />
      ),
      rules: [{ required: true, message: 'Password is required' }],
    },
  ],
};

interface ILoginModelProps {
  loginModalVisible: boolean;
  registerModalVisible: boolean;
  closeAuthModal: any;
  login: any;
  register: any;
  form: any;
}
interface ILoginModelStates {
  type: string;
}

class AuthModal extends React.Component<ILoginModelProps, ILoginModelStates> {
  constructor(props: ILoginModelProps) {
    super(props);
    this.state = {
      type: 'login', // 模态框类型
    };
  }

  static getDerivedStateFromProps(nextProps: any) {
    if (nextProps.loginModalVisible) return { type: 'login' };
    if (nextProps.registerModalVisible) return { type: 'register' };
    return null;
  }

  // 登录
  private handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors: any, values: any) => {
      if (errors) return;
      const { type } = this.state;
      this.props[type](values).then((res: any) => {
        if (res.code === 200) this.props.closeAuthModal(type);
      });
    });
  };

  handleClose = () => this.props.closeAuthModal(this.state.type);

  public render() {
    const { loginModalVisible, registerModalVisible } = this.props;
    const { type } = this.state;

    return (
      <Modal
        title={type}
        width={320}
        footer={null}
        onCancel={this.handleClose}
        visible={loginModalVisible || registerModalVisible}
      >
        <Form layout="horizontal">
          <FormBuilder meta={formMeta} form={this.props.form} />
          <Button
            type="primary"
            block
            htmlType="submit"
            onClick={this.handleSubmit}
          >
            {type}
          </Button>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loginModalVisible: state.global.loginModalVisible,
    registerModalVisible: state.global.registerModalVisible,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    closeAuthModal: (type: any) => {
      dispatch(closeAuthModal(type));
    },
    login: (params: any) => {
      const { username, password } = params;
      return dispatch(login(username, password));
    },
    register: (params: any) => {
      const { username, password } = params;
      return dispatch(register(username, password));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(AuthModal));
