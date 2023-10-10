import { message } from 'antd'

export async function request(url = "", data = {}) {
  try {
    const response = await fetch(`/api/${url}`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    if (response.status >= 200 && response.status < 300) {
      return response?.json?.();
    } else {
      const res = await response.json();
      message.error(res?.message || '接口请求失败')
    }
  } catch (error) {
    console.error(error)
    message.error(error)
  }
}