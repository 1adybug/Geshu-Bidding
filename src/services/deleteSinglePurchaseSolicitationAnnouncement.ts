import { Function_Delete_Single_Purchase_Solicitation_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const deleteSinglePurchaseSolicitationAnnouncement = (_id: string) => {
  return Taro.cloud.callFunction({
    name: Function_Delete_Single_Purchase_Solicitation_Announcement,
    data: {
      _id,
    },
  }) as unknown as Promise<DeleteRespond>;
};
