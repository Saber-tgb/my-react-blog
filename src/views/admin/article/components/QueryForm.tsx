/*
 * @Description: 管理文章查询表单组件
 * @Author: tgb
 * @Date: 2019-05-17 10:07:46
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-17 10:35:47
 */
import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, Select } from 'antd'
import { FormComponentProps } from 'antd/es/form'
import FormBuilder from '@/components/helper/FormBuilder'

const Option = Select.Option

interface IQueryFormProps extends FormComponentProps {
  getQuery: any
  tagList: any[]
  categoryList: any[]
}

class QueryForm extends React.Component<IQueryFormProps> {
  private getFormMeta = () => {
    return {
      colon: true,
      elements: [
        {
          key: 'title',
          label: '标题',
          widget: <Input placeholder="请输入文章标题" />
        },
        {
          key: 'tag',
          label: '标签',
          widget: (
            <Select className="form-select" allowClear>
              {this.props.tagList.map((item: any) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )
        },
        {
          key: 'category',
          label: '分类',
          widget: (
            <Select className="form-select" allowClear>
              {this.props.categoryList.map((item: any) => (
                <Option key={item.name} value={item.name}>
                  {item.name}
                </Option>
              ))}
            </Select>
          )
        }
      ]
    }
  }

  private handleSubmit = (e: any) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) return
      console.log('submit form: ', values)
      this.props.getQuery(values)
    })
  }

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
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    tagList: state.article.tagList,
    categoryList: state.article.categoryList
  }
}

export default connect(mapStateToProps)(
  Form.create<IQueryFormProps>()(QueryForm)
)
