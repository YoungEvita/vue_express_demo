import request from '@/utils/request'

const api = {
    getInfo: '/info',
    getParam: '/param/{id}',
    postData: '/send',
    upload: '/upload'
}

export default api

export function getInfo () {
    return request({
        url: api.getInfo,
        method: 'get'
    })
}

export function getParam (id) {
    return request({
        url: api.getParam.replace(/({.*})/, id),
        method: 'get'
    })
}

export function getUrlParam(params) {
    return request({
        url: api.getInfo,
        method: 'get',
        params: params
    })
}

export function postData(data) {
    return request({
        url: api.postData,
        method: 'post',
        data: data
    })
}
export function upload(data) {
    return request({
        url: api.upload,
        method: 'post',
        data: data
    })
}
