import { Function_PurchaseSolicitation_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const getPurchaseSocilitationAnnouncements = () => {
  return Taro.cloud.callFunction({
    name: Function_PurchaseSolicitation_Announcement,
    data: {},
  })
};
