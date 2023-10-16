import { Function_Delete_Single_Local_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const deleteSingleLocalAnnouncement = (_id?: string) => {
    console.log(6,_id);
    
  return Taro.cloud.callFunction({
    name: Function_Delete_Single_Local_Announcement,
    data: {
      _id,
    },
  }) as unknown as Promise<DeleteRespond>;
};
