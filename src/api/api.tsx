// @ts-ignore
import request from "@/utils/request";

// 微信配置
export const weChatJssdk = async (params: any) => {
  return request(`/api/wechat/bj/jssdk?url=${params}`, {
    method: "GET",
  });
};

export const login = async (data: any) => {
  return request(`https://blog.laughingzhu.cn/front/login/Login_by_yuque`, {
    method: 'POST',
    data
  })
}

// 获取文章列表
export const getList = (params: any) => {
  return request('https://blog.laughingzhu.cn/front/blog/get_list', {
    method: 'GET',
    params
  })
}
// 获取私密列表
export const getPrivateList = (params: any) => {
  return request('https://blog.laughingzhu.cn/front/person/blog_list', {
    method: 'GET',
    params
  })
}

// 获取文章列表
export const getDetail = (params: any) => {
  return request('https://blog.laughingzhu.cn/front/blog/detail', {
    method: 'GET',
    params
  })
}

// 关键字搜索文章
export const getSearchList = (params: any) => {
  return request('https://blog.laughingzhu.cn/front/blog/search_blog', {
    method: 'GET',
    params
  })
}

// 获取文章分类列表
export const getCategoryType = () => {
  return request('https://blog.laughingzhu.cn/front/blog_type/get_list', {
    method: 'GET'
  })
}

// 根据不同维度获取 列表
export const getBlogBySort = (params: any) => {
  return request('https://blog.laughingzhu.cn/front/blog/get_list_by_sort', {
    method: 'GET',
    params
  })
}


// 获取blogInfo data
export const getBlogInfo = () => {
  return request('https://blog.laughingzhu.cn/front/blog/get_stat', {
    method: 'GET',
  })
}
