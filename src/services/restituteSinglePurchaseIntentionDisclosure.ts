import { Function_Restitute_Single_Purchase_Intention_Disclosure } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const restituteSinglePurchaseIntentionDisclosure = (_id?: string) => {
  return Taro.cloud.callFunction({
    name: Function_Restitute_Single_Purchase_Intention_Disclosure,
    data: {
      _id,
    },
  })
};
