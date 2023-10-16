import { Function_Find_Single_Local_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const findSIngleLocalAnnouncement = (id: string) => {
  return Taro.cloud.callFunction({
    name: Function_Find_Single_Local_Announcement,
    data: {
      id,
    },
  }) as unknown as Promise<any>;
};
