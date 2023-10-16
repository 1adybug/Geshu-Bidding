import { Function_Collect_Single_Local_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const collectSingleLocalAnnouncement = (
  id: string,
  collectValue: boolean
) => {
  return Taro.cloud.callFunction({
    name: Function_Collect_Single_Local_Announcement,
    data: {
      _id: id,
      collectValue,
    },
  }) as unknown as Promise<DeleteRespond>;
};
