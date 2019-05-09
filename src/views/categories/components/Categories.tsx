/*
 * @Description: 分类UI组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-29 09:27:21
 * @LastEditTime: 2019-05-09 10:27:16
 */
import React from 'react'
import { Link } from 'react-router-dom'
import { Badge, Tag } from 'antd'

interface ICategoriesProps {
  categoryList: any[]
  colorList: string[]
}

class Categories extends React.Component<ICategoriesProps> {
  public render() {
    const { categoryList, colorList } = this.props
    console.log(categoryList)
    return (
      <div className="content-inner-wrapper categories">
        <h2 className="title">Categories</h2>
        <p className="category-all-title">
          {`${categoryList.length} categories in total`}
        </p>
        <div className="categories-list">
          {categoryList.map((item, i) => (
            <Badge count={item.count} key={item.name}>
              <Tag color={colorList[i]}>
                <Link to={`/categories/${item.name}`}>{item.name}</Link>
              </Tag>
            </Badge>
          ))}
        </div>
      </div>
    )
  }
}

export default Categories
