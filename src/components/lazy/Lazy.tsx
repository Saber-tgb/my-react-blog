/*
 * @Description: 懒加载
 * @Author: tgb
 * @Date: 2019-05-16 14:31:14
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-16 14:38:29
 */
import React from 'react'
import Loading from '@/components/loading/Loading'

interface IAsyncComponentProps {}
interface IAsyncComponentStates {
  component: any
}

export const asyncComponent = (importComponent: any) =>
  class AsyncComponent extends React.Component<
    IAsyncComponentProps,
    IAsyncComponentStates
  > {
    constructor(props: IAsyncComponentProps) {
      super(props)
      this.state = {
        component: null
      }
    }

    async componentDidMount() {
      const { default: component } = await importComponent()
      this.setState({ component })
    }

    render() {
      const RenderComponet = this.state.component
      return RenderComponet ? <RenderComponet {...this.props} /> : <Loading />
    }
  }

export default asyncComponent
