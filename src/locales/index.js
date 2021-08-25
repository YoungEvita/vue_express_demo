import Vue from "vue"
import VueI18n from "vue-i18n"

import enUs from './lang-en'
import zhCN from './lang-cn'

Vue.use(VueI18n)
export const defaultLang = 'zh-CN'

const messages = {
    'en-US': {
        ...enUs
    },
    'zh-CN': {
        ...zhCN
    }
}
const i18n = new VueI18n({
    locale: defaultLang,
    fallbackLocale: defaultLang,
    messages
})

export default i18n
