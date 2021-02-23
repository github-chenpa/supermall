import axios from 'axios'

export function request(config) { //导出一个api
  const instance = axios.create({  //创建一个axios实例对象
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // // axios拦截器
  // instance.interceptors.request.use(config => { //请求拦截
  //   return config
  // },err => {

  // })

  // // 响应拦截
  // instance.interceptors.response.use(res => {
  //   console.log(res);
  //   return res.data //同样需要将结果返回出去
  // },err => {
  //   console.log(err);
  // })

  // 发送真正的网络请求
  return instance(config)
}