/*
 * @Description: webpack配置
 * @Author: tgb
 * @LastEditors: tgb
 * @Date: 2019-04-26 15:21:41
 * @LastEditTime: 2019-04-29 17:32:18
 */
const path = require('path')
const webpack = require('webpack')
const paths = require('react-scripts/config/paths')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias
} = require('customize-cra')

const NODE_ENV = process.env.NODE_ENV
const Analyze = false

const addBundleAnalyzerPlugin = (config) => {
  if (Analyze) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8889,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
      })
    )
  }
  return config
}

const addSplitChunks = (config) => {
  if (NODE_ENV === 'production') {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendors: {
            chunks: 'initial',
            test: /(react|react-dom|react-router-dom|react-redux|redux|redux-thunk|redux-persist|antd)/,
            priority: 100,
            name: 'vendors'
          },
          chartsVenodr: {
            test: /(bizcharts)/,
            priority: 90,
            name: 'chartsVenodr',
            chunks: 'async'
          },
          commons: {
            chunks: 'all',
            minChunks: 2,
            name: 'commons',
            priority: 80
          }
        }
      }
    }
  }
  return config
}

const modifyPath = (config) => {
  if (NODE_ENV === 'production') {
    paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist')
    config.output.path = path.join(path.dirname(config.output.path), 'dist')
  }
  return config
}

module.exports = override(
  addSplitChunks,
  modifyPath,
  addBundleAnalyzerPlugin,
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' }
  })
)
