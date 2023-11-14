import { Function_Contract_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const getcontractAnnouncements = () => {
  return Taro.cloud.callFunction({
    name: Function_Contract_Announcement,
    data: {},
  })
};
