import { Function_PurchaseIntention } from "@/constant/functions";
import Taro from "@tarojs/taro";

export const getPurchaseIntentionDisclosures = () => {
  return Taro.cloud.callFunction({
    name: Function_PurchaseIntention,
    data: {},
  }) as unknown as Promise<CloudFunctionResultSuccess<PurchaseIntentionDisclosure[]>>
};
