import { Function_Completely_Delete_Single_Local_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const completeltyDeleteSingleLocalAnnouncement = (
  willDeleteItemId: string
) => {
  return Taro.cloud.callFunction({
    name: Function_Completely_Delete_Single_Local_Announcement,
    data: {
      _id: willDeleteItemId,
    },
  })
};
