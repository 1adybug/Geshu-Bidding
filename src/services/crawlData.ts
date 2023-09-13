import { Function_Crawl_Data } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const getCrawlData = (listItemId: string) => {
  return Taro.cloud.callFunction({
    name: Function_Crawl_Data,
    data: {
      listItemId,
    },
  });
};
