import { Function_Fetch_Single_Purchase_Intention_Disclosure_By_Id } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const findSinglePurchaseIntentionDisclosureById = (id: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Single_Purchase_Intention_Disclosure_By_Id,
    data: {
      id,
    },
  }) as unknown as Promise<
    CloudFunctionResultSuccess<PurchaseIntentionDisclosure>
  >;
};
