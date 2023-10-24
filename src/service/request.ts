import axios from 'axios';

//1. 创建axios对象
const service = axios.create({
  baseURL: 'http://www.123456.com',
  withCredentials: true
});

//2. 请求拦截器
service.interceptors.request.use(config => {
  return config;
}, error => {
  Promise.reject(error);
});

//3. 响应拦截器
service.interceptors.response.use(response => {
  //判断code码
  return response.data;
},error => {
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
        error.message = '服务器响应超时，请刷新当前页'
    } else {
        error.message = '连接服务器失败'
    }
  }
  //提示
  alert(error.message)
  /***** 处理结束 *****/
  return Promise.reject(error.message);
});

export default service;
