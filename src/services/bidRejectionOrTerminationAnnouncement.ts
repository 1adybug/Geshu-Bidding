import { Function_BidRejectionOrTermination_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const getbidRejectionOrTerminationAnnouncements = () => {
  return Taro.cloud.callFunction({
    name: Function_BidRejectionOrTermination_Announcement,
    data: {},
  })
};
