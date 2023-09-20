import { Function_Completely_Delete_Single_Purchase_Intention_Disclosure } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const completelyDeleteSinglePurchaseIntention = (willDeleteItemId: string) => {
  return Taro.cloud.callFunction({
    name: Function_Completely_Delete_Single_Purchase_Intention_Disclosure,
    data: {
      _id:willDeleteItemId,
    },
  }) as unknown as Promise<DeleteRespond>;
};
