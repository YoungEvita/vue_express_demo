<template>
    <div>
        <a-row class="mt10">
            <a-col :span="2">
                <a-button type="primary" @click="getInfo">GET </a-button>
            </a-col>
            <a-col :span="4">
                <a-input :disabled="true" value="/REST/info"></a-input>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="2"></a-col>
            <a-col :span="4">
                <a-textarea
                    :auto-size="{ minRows: 2, maxRows: 20 }"
                    :disabled="true"
                    v-model="info"
                />
            </a-col>
        </a-row>
        <a-row class="mt10">
            <a-col :span="2">
                <a-button type="primary" @click="getParam">GET </a-button>
            </a-col>
            <a-col :span="4">
                <a-input :disabled="true" value="/REST/param/3"></a-input>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="2"></a-col>
            <a-col :span="4">
                <a-textarea
                    :auto-size="{ minRows: 2, maxRows: 20 }"
                    :disabled="true"
                    v-model="id"
                />
            </a-col>
        </a-row>
        <a-row class="mt10">
            <a-col :span="2">
                <a-button type="primary" @click="getUrlParam">GET </a-button>
            </a-col>
            <a-col :span="4">
                <a-input :disabled="true" value="/REST/info?lang=cn"></a-input>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="2"></a-col>
            <a-col :span="4">
                <a-textarea
                    :auto-size="{ minRows: 2, maxRows: 20 }"
                    :disabled="true"
                    v-model="lang"
                />
            </a-col>
        </a-row>
        <a-row class="mt10">
            <a-col :span="2">
                <a-button type="primary" @click="postData">POST </a-button>
            </a-col>
            <a-col :span="4">
                <a-input :disabled="true" value="/REST/send"></a-input>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="2"></a-col>
            <a-col :span="4">
                <a-textarea
                    :auto-size="{ minRows: 2, maxRows: 20 }"
                    :disabled="true"
                    v-model="posts"
                />
            </a-col>
        </a-row>
        <a-row class="mt10">
            <a-col :span="2">
                <a-upload
                    name="file"
                    :before-upload="beforeUpload"
                    :remove="handleRemove"
                    :showUploadList="false"
                >
                    <a-button type="primary"
                        > 选择文件</a-button
                    >
                </a-upload>
            </a-col>
            <a-col :span="4">
                <a-input :disabled="true" value="/REST/upload"></a-input>
            </a-col>
            <a-col :span="2"> <a-button type="primary" @click="handleUpload">上传</a-button></a-col>
            
        </a-row>
        <a-row>
            <a-col :span="2"></a-col>
            <a-col :span="4">
                <a-textarea
                    :auto-size="{ minRows: 2, maxRows: 20 }"
                    :disabled="true"
                    v-model="name"
                />
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { getInfo, getParam, getUrlParam, postData, upload } from '@/api/api'
export default {
    name: '',
    components: {},
    props: {},
    data() {
        return {
            info: '',
            id: '',
            lang: '',
            posts: '',
            file: '',
            name: '',
        }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        handleRemove() {
            this.name = undefined
        },
        beforeUpload(file) {
            console.log(file)
            this.name = file.name
            this.file = file
            return false
        },
        handleUpload() {
            const formData = new FormData()
            formData.append('file', this.file)
            upload(formData)
                .then(() => {
                    alert('上传成功')
                })
                .catch((err) => console.log(err))
        },
        getInfo() {
            getInfo()
                .then((res) => {
                    this.info = JSON.stringify(res)
                })
                .catch((err) => console.log(err))
        },
        getParam() {
            getParam(3)
                .then((res) => {
                    this.id = 'url参数为： ' + res.id
                })
                .catch((err) => console.log(err))
        },
        getUrlParam() {
            getUrlParam({ lang: 'cn' })
                .then((res) => {
                    this.lang = 'lang为： ' + res
                })
                .catch((err) => console.log(err))
        },
        postData() {
            const data = {
                name: 'Hello',
                age: 17,
            }
            postData(data)
                .then((res) => {
                    this.posts = JSON.stringify(res)
                })
                .catch((err) => console.log(err))
        },
    },
}
</script>

<style scoped lang="less">
.mt10 {
    margin-top: 10px;
}
</style>
