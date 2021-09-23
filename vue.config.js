const path = require('path')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  publicPath: '/',

  transpileDependencies: ['resize-detector', 'ant-design-vue'],

  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash',
        'moment': 'moment'
      })
    ]
  },

  chainWebpack: config => {
    config.resolve.alias
      .set('public', resolve('public'))
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@utils', resolve('src/utils'))
      .set('@views', resolve('src/views'))
  },

  devServer: {
    port: 9000,
    open: true,
    inline: true // 打开热更新
  }

}
