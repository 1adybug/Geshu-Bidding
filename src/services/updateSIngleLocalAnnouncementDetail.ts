import { Function_Update_Single_Local_Announcement_Detail } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const updateSingleLocalAnnouncementDetail = (
  link_id?: string,
  currentRemark?: string
) => {
  return Taro.cloud.callFunction({
    name: Function_Update_Single_Local_Announcement_Detail,
    data: {
      link_id,
      remark: currentRemark,
    },
  }) 
};
