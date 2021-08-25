const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'

const vueConfig = {
    chainWebpack: config => {
        config.resolve.alias.set('@$',path.join(__dirname, 'src'))
    },
    configureWebpack: {
        plugins: []
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    // 'primary-color': 'red'// 覆盖主色调
                },
                javascriptEnabled: true, // 设置为true
            },
        },
    },
    devServer: {
        port: 8000,
        proxy: {
            '/api/REST/': {
                target: 'http://localhost:' + 8095,
                changeOrigin: true
            }
        }
    },
    productionSourceMap: false
    
}

if (isProd) {
    vueConfig.configureWebpack.plugins.push(
        new CompressionWebpackPlugin({
            test: /\.(js|css|json|txt|html|svg)(\?.*)?$/i,
            deleteOriginalAssets: true,
            algorithm: 'gzip',
            minRatio: 2
        })
    )
}

module.exports = vueConfig
