import { Function_Fetch_Local_Announcement_Attachments } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchLocalAnnouncementAttachments = (link_href:string) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Local_Announcement_Attachments,
    data: {
        link_href
    },
  }) as unknown as Promise<any>;
};
