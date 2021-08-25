# vue + express

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 整体项目步骤
#### 一、项目搭建

##### 1、安装vue-cli
```
npm install @vue/cli
```
##### 2、创建项目
```
vue create <项目名称>
```
#### 二、项目中用到的插件
##### 1、与后端数据通信 axios
- 安装
```
npm install axios
```
- 封装
```
import axios from 'axios'
import { VueAxios  } from './axios'

// 创建实例
const request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 30000
})

// 异常处理
const errorHandler = error => {
    if (error.response) {
        // do something
        if (error.response.status === 404) {
            console.log('Not found')
        }
    }
    return Promise.reject(error)
}

// 配置请求拦截
request.interceptors.request.use(config => {
    config.headers['Token'] = 'hello'
}, errorHandler)

// 响应拦截
request.interceptors.response.use(response => {
    return response.data
}, errorHandler)

const installer = {
    install (Vue) {
        Vue.use(VueAxios, request)
    }
}
export default request
export { installer as VueAxios, request as axios}

```
```
// 统一管理接口 sr/api/api.js
import request from '@/utils/request'

const api = {
    getInfo: '/info'
}

export default api

export function getInfo () {
    return request({
        url: api.getInfo,
        method: 'get'
    })
}
```
##### 2、UI组件库 ant design
- 安装
```
npm install ant-design-vue
```
- 引入
    - 方法1: 修改src/main.js
    ```
    import Button from 'ant-design-vue/lib/button'
    import 'ant-design-vue/dist/antd.css'

    Vue.component(Button.name, Button)
    ```
    - 方法2: 使用babel-plugin-import插件修改babel.config.js
    ```
    // babel.config.js
    const plugins = []
    plugins.push([
    'import',
    {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true
    }
    ]

    )
    module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins
    };
    ```
    ```
    // src/main.js
    import { Button } from 'ant-design-vue'
    Vue.use(Button)
    ```
    // 报错Inline JavaScript is not enabled，需开启javascriptEnabled
    ```
    \\ 配置vue.config.js
    module.exports = {
        css: {
            loaderOptions: {
                less: {
                    modifyVars: {
                        // 'primary-color': 'red'// 覆盖主色调
                    },
                    javascriptEnabled: true // 设置为true
                }
            }
        }
    }
    ```

##### 3、后端仿真数据 mock + express
- 安装
```
npm install express

npm intall mockjs

```
- 配置
|-- mock
|   |-- app.js // 入口文件，配置路由，中间件，服务等
|   |-- package.json // 配置启动脚本
|   |-- routes // 路由
|   |-- services // 路由
|   `-- upload // 用来接收上传文件目录

##### 4、联动起前端和后端服务concurrently
```
npm install concurrently
// package.json 配置脚本命令
"scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "mock": "npm run mock --prefix mock",
    "dev": "concurrently -r \"npm run serve\" \"npm run mock\""
  },
```
##### 5、国际化
```
npm install vue-i18n
```

#### 6、Eslint 相关配置
```
// .eslintrc.js 代码规范检查
rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: [ // 配置四个缩进
      'warn',
            4,
            {
        ignoredNodes: ['TemplateLiteral'], 
      },
    ],
  }
```
```
// .prettierrc 格式化
{
    "semi": false,
    "singleQuote": true,
    "prettier.spaceBeforeFunctionParen": true
}
```
// 如果warning  Replace `··name:·""` with `name:·''`    prettier/prettier
//去掉 eslintrc.js 中的 extends中的"@vue/prettier"

// .editorconfig 同一不同IDE代码规范
```
[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
insert_final_newline = true
indent_size = 4
indent_style = space
```
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
