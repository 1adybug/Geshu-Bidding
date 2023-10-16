import { Function_Fetch_Local_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchLocalAnnouncement = () => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Local_Announcement,
    data: {},
  }) as unknown as Promise<any>;
};
