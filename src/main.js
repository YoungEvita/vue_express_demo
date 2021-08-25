import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './core/lazyUse'
import {VueAxios } from './utils/request'
import i18n from './locales'
Vue.config.productionTip = false
// 这样在Vue组件里也可以直接使用this.$http 或者this.$axios 去请求，不建议，建议同一管理接口
Vue.use(VueAxios) 
new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
}).$mount('#app')
