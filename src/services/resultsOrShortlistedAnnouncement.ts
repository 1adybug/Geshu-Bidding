import { Function_ResultsOrShortlisted_Announcement } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const getresultsOrShortlistedAnnouncement = () => {
  return Taro.cloud.callFunction({
    name: Function_ResultsOrShortlisted_Announcement,
    data: {},
  }) as unknown as Promise<
    CloudFunctionResultSuccess<PurchaseIntentionDisclosure[]>
  >;
};
