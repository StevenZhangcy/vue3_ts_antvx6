import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router';
import store from './store';
import Http from './plugins/http.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


createApp(App)
.use(router)
.use(store)
.use(Http)
.use(ElementPlus)
.mount('#app')