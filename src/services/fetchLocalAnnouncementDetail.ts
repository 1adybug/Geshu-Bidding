import { Function_Fetch_Local_Announcement_detail } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchLocalAnnouncementDetail = (id: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Local_Announcement_detail,
    data: {
      link_id: id,
    },
  })
};
