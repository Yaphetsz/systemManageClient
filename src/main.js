import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import AuthUserApi from './api/AuthUserApi';
import AuthUser from './lib/AuthUser';


import formatDate from './style/js/formatdate'
import vHeader from './components/common/Header.vue'
import vFooter from './components/common/Footer.vue';
import DatePicker from './components/common/DatePicker'
import vSidebar from './components/common/Sidebar.vue';
import vPage from './components/common/Pagination.vue';

Vue.component('v-header', vHeader);
Vue.component('v-footer', vFooter);
Vue.component('v-sidebar', vSidebar);
Vue.component('v-page', vPage);
Vue.component('date-picker', DatePicker);


Vue.use(ElementUI);
Vue.prototype.$axios = axios;

let vueInstance = null;
//检查授权URL
const CHECK_AUTH_URL = '/api/auth/check';
// 请求拦截器
axios.interceptors.request.use((config)=> {
    return config;
}, (error) => {
    return Promise.reject(error);
});

//响应拦截器
axios.interceptors.response.use((response) => {
    if(response.data.code == 300 && response.config.url != CHECK_AUTH_URL){
        AuthUser.setInvalidBeforeUrl(window.location.href);
        AuthUser.setSSOUrl(response.data.data.sso);
        vueInstance.$router.push('/invalid');
    }
    return response.data;
}, (error) => {
    vueInstance.$message.error('服务器异常:',error);
    return Promise.reject(error);
});

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    created(){
        vueInstance = this;
        let authUserApi = new AuthUserApi();
        authUserApi.check()
            .then((res) => {
                if(res.code == 300){
                    //未授权 跳转到认证中心
                    window.location= res.data.sso +'?returnUrl='+encodeURIComponent(window.location.href);
                } else if(res.code == 200){
                } else {
                    console.log('服务器异常：',res.msg);
                }
            });
    }
});
