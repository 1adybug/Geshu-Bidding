import { Function_Update_Avator } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const updateAvator = (userId?: string, avatorUrl?: string) => {
  return Taro.cloud.callFunction({
    name: Function_Update_Avator,
    data: {
      userId,
      avatorUrl,
    },
  }) as unknown as Promise<any>;
};
