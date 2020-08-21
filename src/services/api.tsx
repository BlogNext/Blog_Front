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
