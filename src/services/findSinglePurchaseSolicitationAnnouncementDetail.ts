import { Function_Find_Single_Purchase_Solicitation_Announcement_Detail_By_LinkId } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const findSinglePurchaseSolicitationAnnouncementDetail = (
  link_id: string
) => {
  return Taro.cloud.callFunction({
    name: Function_Find_Single_Purchase_Solicitation_Announcement_Detail_By_LinkId,
    data: {
      link_id,
    },
  })
};
