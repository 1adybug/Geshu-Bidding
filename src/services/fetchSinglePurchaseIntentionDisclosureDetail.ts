import { Function_Fetch_Single_Purchase_Intention_Disclosure_Detail } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchSinglePurchaseIntentionDisclosureDetail = (href: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Single_Purchase_Intention_Disclosure_Detail,
    data: {
      href,
    },
  }) as unknown as Promise<
    CloudFunctionResultSuccess<PurchaseIntentionDisclosure>
  >;
};
