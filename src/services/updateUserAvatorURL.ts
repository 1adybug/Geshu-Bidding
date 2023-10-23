import { Function_Update_User_AvatorURL } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const updateUserAvatorURL = (userId?: string, avatorUrl?: string) => {
  return Taro.cloud.callFunction({
    name: Function_Update_User_AvatorURL,
    data: {
      userId,
      avatorUrl,
    },
  }) as unknown as Promise<any>;
};
