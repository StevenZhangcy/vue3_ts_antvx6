import axios, { AxiosInstance } from 'axios';
import { App, ElMessageBox } from 'element-plus'; // 导入ElMessageBox
import store from '@/store';
import router from '@/router';

const Http = {
  install(app: App) {
    // 创建 Axios 实例
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: '',
      withCredentials: false,
    });

    // 添加请求拦截器
    axiosInstance.interceptors.request.use(
      config => {
        const token = store.state.token || null;
        if (token) {
          config.headers.Authorization = `${token}`;
        }
        if (config.url?.includes('doLogin') || config.url?.includes('loginOut')) {
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    axiosInstance.interceptors.response.use(
      response => {
        const { data } = response;

        if (data.code === 2004 || data.code === 3004) {
          if (router.currentRoute.name !== 'login') {
            ElMessageBox.confirm(
              data.code === 2004 ? '当前账户token已失效，是否去登录?' : '当前系统未登录，是否去登录?',
              '提示',
              {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
              router.push('/login');
            }).catch(() => {});
          }
        }

        return data;
      },
      error => {
        const { status } = error.response;
        if (router.currentRoute.name !== 'NotFound' && (status === 404 || status === 500)) {
          router.push('/404');
        }
        return Promise.reject(error);
      }
    );

    // 挂载到Vue实例上
    app.config.globalProperties.$http = axiosInstance;
  }
};

export default Http;
