/*
 * @Description: 编辑文章
 * @Author: tgb
 * @Date: 2019-05-17 10:42:45
 * @LastEditors: tgb
 * @LastEditTime: 2019-05-17 15:19:19
 */
import React from 'react'
import { RouteComponentProps } from 'react-router'
import { withRouter } from 'react-router-dom'
import { Button, Input, Modal, BackTop } from 'antd'
import SimpleMDE from 'simplemde'
import SelectCate from './Cate'
import { getArticleContent, postArticleCreate, postArticleUpdate } from '@/api'
import { translateMarkdown } from '@/utils'

interface IEditProps extends RouteComponentProps {}
interface IEditStates {
  value: string
  title: string
  tagList: any[]
  categoryList: any[]
  isEdit: boolean
  smde: any
  articleId: number | string
  $tagRef: any
  $categoryRef: any
}

class Edit extends React.Component<IEditProps, IEditStates> {
  constructor(props: IEditProps) {
    super(props)
    this.state = {
      value: '',
      title: '',
      tagList: [],
      categoryList: [],
      isEdit: false, // 组件状态 更新或创建
      smde: null,
      articleId: '',
      $tagRef: null,
      $categoryRef: null
    }
  }

  private handleSubmit = () => {
    const tags = this.state.$tagRef.getResult()
    const categories = this.state.$categoryRef.getResult()
    let params = {
      title: this.state.title,
      content: this.state.smde.value(),
      categories,
      tags
    }
    if (this.state.isEdit) {
      postArticleUpdate({ ...params, articleId: this.state.articleId }).then(
        (res: any) => {
          Modal.confirm({
            title: '文章修改成功！是否查看详情？',
            onOk: () =>
              this.props.history.push(`/article/${this.state.articleId}`)
          })
        }
      )
    } else {
      postArticleCreate(params).then((res: any) => {
        Modal.confirm({
          title: '文章创建成功！是否立即查看？',
          onOk: () => this.props.history.push(`/article/${res.data.id}`)
        })
      })
    }
  }

  // 分页处理
  private handleChange = (e: any) => {
    // this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    const smde = new SimpleMDE({
      // element: document.getElementById('editor').childElementCount,
      autofocus: true,
      autosave: true,
      previewRender: translateMarkdown
    })
    this.setState({ smde })

    if (this.props.history.location.state) {
      const { articleId } = this.props.history.location.state
      getArticleContent(articleId).then((res: any) => {
        const { title, tags, categories, content } = res.data
        this.state.smde.value(content)
        const tagList = tags.map((d: any) => d.name)
        const categoryList = categories.map((d: any) => d.name)
        this.setState({ title, tagList, categoryList, isEdit: true, articleId })
      })
    }
  }

  public render() {
    const { title, value, categoryList, tagList, isEdit } = this.state
    return (
      <div className="edit">
        <div className="blog-formItem">
          <span className="label">标题：</span>
          <Input
            placeholder="请输入文章标题"
            className="title-input"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
        </div>
        <SelectCate
          type="category"
          showNum={10}
          onRef={(el: any) =>
            this.setState({
              $categoryRef: el
            })
          }
          list={categoryList}
          isEdit={isEdit}
        />
        <SelectCate
          type="tag"
          showNum={12}
          onRef={(el: any) =>
            this.setState({
              $tagRef: el
            })
          }
          list={tagList}
          isEdit={isEdit}
        />
        <br />
        <textarea id="editor" defaultValue={value} />
        <Button onClick={this.handleSubmit} type="primary">
          {isEdit ? '更新' : '创建'}
        </Button>
        <BackTop />
      </div>
    )
  }
}

export default withRouter(Edit)
