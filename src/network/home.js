// 所有首页对网络数据的请求
import {request} from './request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}