/*
 * @Description: 
 * @Author: LaughingZhu
 * @Date: 2021-05-31 10:41:23
 * @LastEditros: 
 * @LastEditTime: 2021-06-02 23:21:52
 */
import * as dayjs from 'dayjs'

export const getLocalStorage = (key: string) => {
  if(key) {
    const value = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '{}') : null;
    
    if(value === null) return null;
    if(value.expires < dayjs().valueOf()) return null;
    
    // 未失效

    const response = value
    return response

  } else {
    return undefined
  }
}

/**
 * @description 设置localStorage，自动设置过期时间 [expires] = 一周
 * @param key localStorage 字段名
 * @param value localStorage 值
 * @returns 
 */
export const setLocalStorage = (key: string, value: any, exp: 'day' | 'hour') => {
  if(key && value) {
    // value 类型
    const valueType = Object.prototype.toString.call(value);

    // 初始化过期时间字段 [expires], 时间为一周后
    const expires = dayjs().add(exp === 'day' ? 3 : 1, exp).valueOf();
    let data = {}

    switch (valueType) {
      case '[object Object]':
        // 对象类型
        
        data = {
          expires,
          expires_type: exp,
          data: { 
            ...value
          }
        }
        
        localStorage.setItem(key, JSON.stringify(data)) 
        break;
      case '[object Array]':
        // 数组类型
        data = {
          expires,
          expires_type: exp,
          data: [
            ...value
          ]
        }

        localStorage.setItem(key, JSON.stringify(data)) 
        break;
    
      default:
        // 其它基本类型，重新分装为对象类型
        break;
    }
  } else {
    return;
  }
}

