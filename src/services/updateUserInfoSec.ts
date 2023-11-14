import { Function_Update_UserInfo_Sec } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const updateUserInfoSec = (
  userId?: string,
  userName?: string,
  password?: string,
  roleId?: string
) => {
  return Taro.cloud.callFunction({
    name: Function_Update_UserInfo_Sec,
    data: {
      userId,
      userName,
      password,
      roleId,
    },
  })
};
