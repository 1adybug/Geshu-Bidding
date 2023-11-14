import { Function_Collect_Single_Purchase_Solicitation_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const collectSinglePurchaseSolicitationAnnouncement = (
  id: string,
  collectValue: boolean
) => {
  return Taro.cloud.callFunction({
    name: Function_Collect_Single_Purchase_Solicitation_Announcement,
    data: {
      _id: id,
      collectValue,
    },
  })
};
