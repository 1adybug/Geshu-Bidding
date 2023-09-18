import { Function_Fuzzy_Search } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fuzzySearch = (listItemId: string, keyword: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fuzzy_Search,
    data: {
      listItemId,
      keyword,
    },
  }) as unknown as Promise<
    CloudFunctionResultSuccess<PurchaseIntentionDisclosure[]>
  >;
};
