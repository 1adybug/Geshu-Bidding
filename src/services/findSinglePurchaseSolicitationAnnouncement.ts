import { Function_Find_Single_Purchase_Solicitation_Announcement_By_Id } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const findSinglePurchaseSolicitationAnnouncement = (id: string) => {
  return Taro.cloud.callFunction({
    name: Function_Find_Single_Purchase_Solicitation_Announcement_By_Id,
    data: {
      id,
    },
  })
};
