/*
 * @Description: 后台管理用户页面
 * @Author: tgb
 * @Date: 2019-05-16 14:45:13
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-16 18:06:27
 */
import React from 'react';
import { getCommentsCount } from '@/utils';
import moment from 'moment';
import QueryForm from './components/QueryForm';
import { Table, Button, Modal, message, Badge } from 'antd';
import { getUserList, deleteUser } from '@/api';

interface IUserProps {}
interface IUserStates {
  list: any[];
  pagination: any;
  loading: boolean;
  query: any;
}

class User extends React.Component<IUserProps, IUserStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: [],
      pagination: {},
      loading: false,
      query: '',
    };
  }

  private getColumns = () => {
    return [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '评论数',
        dataIndex: 'comments',
        render: (text: any) => {
          const count = getCommentsCount(text);
          return count !== 0 ? (
            <Badge count={count} style={{ backgroundColor: '#52c41a' }} />
          ) : (
            count
          );
        },
        sorter: (a: any, b: any) =>
          getCommentsCount(a.comments) - getCommentsCount(b.comments),
      },
      {
        title: '注册时间',
        dataIndex: 'createdAt',
        sorter: (a: any, b: any) =>
          moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1,
      },
      {
        title: '操作',
        render: (text: any, record: any) => (
          <Button
            type="danger"
            onClick={() => this.handleDelete(record.id, record.username)}
          >
            删除
          </Button>
        ),
      },
    ];
  };

  // 获取数据
  fetchList = ({ current = 1, pageSize = 10, ...query }) => {
    this.setState({ loading: true });
    const params = {
      page: current,
      pageSize,
      ...query,
    };
    getUserList(params).then((res: any) => {
      const pagination = {
        current,
        pageSize,
        total: res.count,
      };
      this.setState({ list: res.rows, pagination, loading: false });
    });
  };

  // 删除用户
  private handleDelete = (userId: number, username: string) => {
    Modal.confirm({
      title: '您确认删除该用户?，此操作不可恢复！',
      content: `用户： ${username} `,
      onOk: () => {
        deleteUser({ userId }).then((res: any) => {
          if (res.code === 200) {
            this.fetchList(this.state.pagination);
            message.success(res.message);
          }
        });
      },
    });
  };

  private handleChange = (pagination: any) => {
    this.fetchList({ ...pagination, ...this.state.query });
  };
  // 查询
  private getQuery = (query: any) => {
    this.setState({ query });
    this.fetchList({ ...query, current: 1 });
  };

  componentDidMount() {
    this.fetchList({ page: 1 });
  }
  public render() {
    const { list, pagination, loading } = this.state;
    return (
      <div>
        <QueryForm getQuery={this.getQuery} />
        <Table
          rowKey="id"
          bordered
          columns={this.getColumns()}
          loading={loading}
          dataSource={list}
          pagination={pagination}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default User;
