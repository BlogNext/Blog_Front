// @ts-ignore
import request from "@/utils/request";

// 微信配置
export const weChatJssdk = async (params: any) => {
  return request(`/api/wechat/bj/jssdk?url=${params}`, {
    method: "GET",
  });
};

/**
 * 获取短信验证码
 * 
 */
export const uploadFile = async (data: any) => {
  return request(`/common/attachment/upload_blog`, {
    method: 'POST',
    data
    // header: { 'Content-Type': 'multipart/form-data'  }
  })
}
