import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';


import {postRequest} from "@/utils/api";
import {putRequest} from "@/utils/api";
import {getRequest} from "@/utils/api";
import {deleteRequest} from "@/utils/api";
import {initMenu} from "@/utils/menus";
import {downloadRequest} from "@/utils/download";

Vue.config.productionTip = false
Vue.use(ElementUI,{size:'small'});
// 插件形式使用请求
Vue.prototype.postRequest = postRequest
Vue.prototype.putRequest = putRequest
Vue.prototype.getRequest = getRequest
Vue.prototype.deleteRequest = deleteRequest
Vue.prototype.downloadRequest = downloadRequest // 以插件的形式使用下载相关请求

Vue.directive('preventReClick', {
    inserted (el, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true;
                setTimeout(() => {
                    el.disabled = false;
                }, binding.value || 3000)
            }
        })
    }
})

router.beforeEach((to,from,next)=>{
    if(window.sessionStorage.getItem('tokenStr')){
        initMenu();
        next();
    }else{
        if (to.path === '/') {
            next()
        } else {
            next('/?redirect=' + to.path)
        }
    }

})



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
