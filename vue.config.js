
module.exports = {
  parallel: false,
  outputDir: './docs',
  publicPath: process.env.NODE_ENV === 'production' ? 'https://ph2017.github.io/kitchen-h5' : '/',
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // 'text-color': 'red',
            // 'border-color': 'blue',
            // '@primary-color:': '#000'
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "./src/styles/theme.less";`,
          }
        }
      }
    }
  }
};