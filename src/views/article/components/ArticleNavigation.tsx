/*
 * @Description: 文章导航组件
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-05-09 15:09:33
 * @LastEditTime: 2019-05-09 15:18:21
 */

import React from 'react'
import { Anchor } from 'antd'

const { Link } = Anchor

// 转化为锚地可跳转的路径
function transferHref(str: string) {
  let v1 = str.replace(/(\s)|(,)/g, '-')
  let v2 = v1.replace(/[./()]/g, '')
  return `#${v2.replace(/-+/g, '-')}`
}

// 根据 article 来生成锚点列表
function getAnchorList(str: string) {
  const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g
  let list: any[] = []
  function pushItem(arr: any[], item: any) {
    const len = arr.length
    const matchItem = arr[len - 1]
    if (matchItem && matchItem.tag !== item.tag) {
      pushItem(matchItem.children, item)
    } else {
      arr.push(item)
      // debugger
    }
  }
  str.replace(
    pattern,
    ($0: string, $1: string): string => {
      const title = $0.replace(/.*?>/, '')
      const href = transferHref(title)
      const currentItem = {
        tag: $1, // 标签类型
        title,
        href,
        children: []
      }
      pushItem(list, currentItem)
      return ''
    }
  )
  return list
}

const ArticleNavigation = ({ content }: any) => {
  const list = getAnchorList(content)
  function renderLink({ href, title, children }: any) {
    return (
      <Link key={href} href={href} title={title}>
        {children.length > 0 && children.map((sub: any) => renderLink(sub))}
      </Link>
    )
  }
  return <Anchor affix={false}>{list.map(renderLink)}</Anchor>
}

export default ArticleNavigation
