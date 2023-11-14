import { Function_Other_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const getOtherAnnouncement = () => {
  return Taro.cloud.callFunction({
    name: Function_Other_Announcement,
    data: {},
  })
};
