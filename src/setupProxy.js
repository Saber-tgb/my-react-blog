/*
 * @Description: 跨域配置
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-26 16:40:22
 * @LastEditTime: 2019-04-29 09:41:50
 */

const proxy = require('http-proxy-middleware')

const API_ROOT = 'http://www.example.org'

module.exports = (app) => {
  app.use(
    proxy('/loanadmin', {
      target: API_ROOT,
      changeOrigin: true
    })
  )
}
