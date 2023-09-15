import { Function_Fetch_Single_Detail } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchSingleDetail = (href: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Single_Detail,
    data: {
      href,
    },
  }) as unknown as Promise<
    CloudFunctionResultSuccess<PurchaseIntentionDisclosure>
  >;
};
