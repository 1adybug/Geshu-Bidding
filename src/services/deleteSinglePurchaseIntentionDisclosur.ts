import { Function_Delete_Single_Purchase_Intention_Disclosure } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const deleteSinglePurchaseIntentionDisclosure = (_id: string) => {
  return Taro.cloud.callFunction({
    name: Function_Delete_Single_Purchase_Intention_Disclosure,
    data: {
      _id,
    },
  }) as unknown as Promise<DeleteRespond>;
};
