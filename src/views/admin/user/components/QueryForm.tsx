/*
 * @Description: 查询表单
 * @Author: tgb
 * @Date: 2019-05-16 16:54:49
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-16 18:43:38
 */

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import FormBuilder from '@/components/helper/FormBuilder';

interface IQueryFormProps extends FormComponentProps {
  getQuery: any;
}

class QueryForm extends React.Component<IQueryFormProps> {
  constructor(props: IQueryFormProps) {
    super(props);
  }
  private getFormMeta = () => {
    return {
      colon: true,
      elements: [
        {
          key: 'username',
          label: '姓名',
          widget: <Input placeholder="请输入姓名" />,
        },
      ],
    };
  };

  private handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors: any, values: string) => {
      if (errors) return;
      console.log('submit form: ', values);
      this.props.getQuery(values);
    });
  };

  public render() {
    return (
      <div className="query-form">
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormBuilder meta={this.getFormMeta()} form={this.props.form}>
            <Button type="primary" htmlType="submit">
              检索
            </Button>
          </FormBuilder>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    prop: state.article,
  };
};

export default connect(mapStateToProps)(
  Form.create<IQueryFormProps>()(QueryForm),
);
