import { Function_Fetch_Avator_Url } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchAvatorUrl = (fileID: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Avator_Url,
    data: {
      fileID,
    },
  })
};
