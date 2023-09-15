import { Function_Fetch_Data_Details } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchDataDetails = (hrefList: string[]) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Data_Details,
    data: {
      hrefList,
    },
  }) as unknown as Promise<
    CloudFunctionResultSuccess<PurchaseIntentionDisclosure[]>
  >;
};
