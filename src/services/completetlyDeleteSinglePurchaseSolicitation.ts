import { Function_Completely_Delete_Single_Purchase_Solicitation_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const completetlyDeleteSinglePurchaseSolicitation = (
  willDeleteItemId: string
) => {
  return Taro.cloud.callFunction({
    name: Function_Completely_Delete_Single_Purchase_Solicitation_Announcement,
    data: {
      _id: willDeleteItemId,
    },
  })
};
