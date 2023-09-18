import { CardProps } from "@/components/card";
import { Function_PurchaseIntention_Disclosure } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const getPurchaseIntentionDisclosures = () => {
  return Taro.cloud.callFunction({
    name: Function_PurchaseIntention_Disclosure,
    data: {},
  }) as unknown as Promise<CloudFunctionResultSuccess<CardProps>>
};
