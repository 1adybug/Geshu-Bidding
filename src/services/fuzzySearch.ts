import { Function_Fuzzy_Search } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fuzzySearch = (currentListItemId: string, keyword: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fuzzy_Search,
    data: {
      currentListItemId,
      keyword,
    },
  })
};
