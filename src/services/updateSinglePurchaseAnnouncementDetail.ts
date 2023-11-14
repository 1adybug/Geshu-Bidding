import { Function_Update_Purchase_Announcement_Detail } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const updateSinglePurchaseAnnouncementDetail = (
  link_id?: string,
  currentRemark?: string
) => {
  return Taro.cloud.callFunction({
    name: Function_Update_Purchase_Announcement_Detail,
    data: {
      link_id,
      remark: currentRemark,
    },
  }) 
};
