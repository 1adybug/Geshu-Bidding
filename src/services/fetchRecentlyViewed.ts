import { Fetch_Recently_Viewes } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchRecentlyViewed = () => {
  return Taro.cloud.callFunction({
    name: Fetch_Recently_Viewes,
    data: {},
  }) as unknown as Promise<any>;
};
