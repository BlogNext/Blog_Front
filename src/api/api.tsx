// @ts-ignore
import request from "@/utils/request";

// 微信配置
export const weChatJssdk = async (params: any) => {
  return request(`/api/wechat/bj/jssdk?url=${params}`, {
    method: "GET",
  });
};

/**
 * 获取用户信息
 */
export const getInfo = async () => {
  return request(`/api/renew/autumn/info`, {
    method: "GET",
  });
};

/**
 * 获取短信验证码
 * 
 */
export const getCode = async (data: any) => {
  return request(`/api/time/sendCode`, {
    method: 'POST',
    data
  })
}

// 获取分类列表
export const getCategoryList = () => {
  return request('/front/blog_type/get_list', {
    method: 'GET'
  })
}

// 获取文章列表
export const getList = (params: any) => {
  return request('https://blog.laughingzhu.com/front/blog/get_list', {
    method: 'GET',
    params
  })
}

// 获取文章列表
export const getDetail = (params: any) => {
  return request('https://blog.laughingzhu.com/front/blog/detail', {
    method: 'GET',
    params
  })
}

// 关键字搜索文章
export const getSearchList = (params: any) => {
  return request('https://blog.laughingzhu.com/front/blog/search_blog', {
    method: 'GET',
    params
  })
}

// 获取文章分类列表
export const getCategoryType = () => {
  return request('https://blog.laughingzhu.com/front/blog_type/get_list', {
    method: 'GET'
  })
}