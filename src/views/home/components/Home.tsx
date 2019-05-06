/*
 * @Description: 首页UI组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:27:21
 * @LastEditTime: 2019-05-06 19:18:52
 */
import React, { Fragment } from 'react';
import { getArticleList } from '@/api';

interface IHomeProps {
  props: any;
}
interface IHomeStates {
  list: any[];
}

class Home extends React.Component<IHomeProps, IHomeStates> {
  constructor(props: IHomeProps) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    const params = { page: 1, pageSize: 10, title: 222 };
    getArticleList(params).then((res: any) => {
      console.log(res);
    });
  }

  public render() {
    const { list } = this.state;
    return (
      <div className="content-inner-wrapper home">
        <Fragment>
          <ul className="ul-list">{list.map((item: any) => {})}</ul>
          首页
        </Fragment>
      </div>
    );
  }
}

export default Home;
