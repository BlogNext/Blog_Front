import request from "../utils/request.js";

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
 * @desc 分类列表
 * @method get
 * @return array
 */
export const getCategoryList = (params: any) => {
  return request('/blackend/blog_type/get_list', {
    method: 'GET',
    params
  })
}
