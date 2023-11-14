import { Function_Correct_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const getCorrectAnnouncement = () => {
  return Taro.cloud.callFunction({
    name: Function_Correct_Announcement,
    data: {},
  })
};
