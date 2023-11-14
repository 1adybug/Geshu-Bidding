import { Function_Collect_Single_Purchase_Intention_Disclosure } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const collectSinglePurchaseIntentionDisclosure = (
  id: string,
  collectValue: boolean
) => {
  return Taro.cloud.callFunction({
    name: Function_Collect_Single_Purchase_Intention_Disclosure,
    data: {
      _id: id,
      collectValue,
    },
  })
};
