import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Login from './Login'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import filters from './filters'
import components from './components'


Vue.use(filters);
Vue.use(ElementUI);
Vue.use(components);

Vue.config.productionTip = false;
// 使用请求拦截，config请求配置项，该回调返回的值是你最终返回的配置
axios.interceptors.request.use(function (config) {
  store.commit("CHANGE_LOADING",true);
  //解决304
  config.url = "/ele"+config.url+(config.url.includes("?")?"&":"?")+"t="+Date.now();
  config.headers={
          authorization:store.state.admin.token
      };
  return config
});
//响应拦截，将返回的结果进行拦截，该回调返回的值就是你返回的内容
axios.interceptors.response.use(function ({data}) {
  store.commit("CHANGE_LOADING",false);
  if(data.ok === 2){
    store.commit("OUT_LOGIN")
  }else{
    return data
  }
});
new Vue({
  router,
  store,
  render: function (h) { return h(this.$store.state.admin.token?App:Login) }
}).$mount('#app');