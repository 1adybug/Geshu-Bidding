import { Function_Restitute_Single_Local_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const restituteSingleLocalAnnouncement = (_id?: string) => {
  return Taro.cloud.callFunction({
    name: Function_Restitute_Single_Local_Announcement,
    data: {
      _id,
    },
  })
};
