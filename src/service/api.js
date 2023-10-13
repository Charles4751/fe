import { message } from 'antd'
import axios from 'axios'

export function request(url, data) {
  return axios.post(`/api/${url}`, data)
    .then(res => {
      if (res.status >= 200 && res.status < 300) {
        return res.data;
      }
    }).catch(err => {
      message.error(err?.response?.data?.message || '请求失败')
      return Promise.reject(err);
    })
}
