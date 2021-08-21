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
    return config
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
