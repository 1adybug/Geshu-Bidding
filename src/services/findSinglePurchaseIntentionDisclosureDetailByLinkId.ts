import { Function_Find_Single_Purchase_Intention_Disclosure_Detail_By_LinkId } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const findSinglePurchaseIntentionDisclosureDetailByLinkId = (link_id: string) => {
  return Taro.cloud.callFunction({
    name: Function_Find_Single_Purchase_Intention_Disclosure_Detail_By_LinkId,
    data: {
      link_id,
    },
  }) as unknown as Promise<
    CloudFunctionResultSuccess<PurchaseIntentionDisclosureDetail>
  >;
};