const path = require('path')

module.exports = {
    chainWebpack: config => {
        config.resolve.alias.set('@$',path.join(__dirname, 'src'))
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
    }
}
