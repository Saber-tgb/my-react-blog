/*
 * @Description: 跨域配置
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-26 16:40:22
 * @LastEditTime: 2019-04-26 16:41:05
 */

const proxy = require('http-proxy-middleware')

const API_ROOT = ''

module.exports = (app) => {
  app.use(
    proxy('/loanadmin', {
      target: API_ROOT,
      changeOrigin: true
    })
  )
}
