import { Function_Find_Single_Purchase_Intention_Disclosure } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const findSinglePurchaseIntentionDisclosure = (id: string) => {
  return Taro.cloud.callFunction({
    name: Function_Find_Single_Purchase_Intention_Disclosure,
    data: {
      id,
    },
  }) as unknown as Promise<
    CloudFunctionResultSuccess<PurchaseIntentionDisclosure>
  >;
};
