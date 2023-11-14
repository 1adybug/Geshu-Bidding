import { Function_Fetch_Attachments } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchThisSolicitationAnnouncementAttachments = (link_href: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Attachments,
    data: {
      link_href,
    },
  })
};
