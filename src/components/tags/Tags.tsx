/*
 * @Description: 标签组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-07 17:47:34
 * @LastEditTime: 2019-05-09 17:38:16
 */
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Icon, Tag, Divider } from 'antd'

interface ITagsProps {
  type: string
  list?: any[]
  colorList?: any[]
}

class Tags extends React.Component<ITagsProps> {
  public render() {
    const { type, list, colorList } = this.props
    return (
      <Fragment>
        <Divider type="vertical" />
        {type === 'tags' ? (
          <i
            className="iconfont icon-tags"
            style={{ marginRight: 7, verticalAlign: 'middle' }}
          />
        ) : (
          <Icon type="folder" style={{ marginRight: 7 }} />
        )}
        {list &&
          list.map((item, i) => (
            <Tag
              color={type === 'tags' && colorList ? colorList[i] : '#2db7f5'}
              key={`${item.name}${i}`}
            >
              <Link to={`/${type}/${item.name}`}>{item.name}</Link>
            </Tag>
          ))}
      </Fragment>
    )
  }
}

const mapStateToProps = (state: any) => ({
  colorList: state.global.colorList
})

export default connect(mapStateToProps)(Tags)
