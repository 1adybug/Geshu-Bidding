import { Function_Recently_Viewed } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const recentlyViewed = (id: string, type?: string) => {
  return Taro.cloud.callFunction({
    name: Function_Recently_Viewed,
    data: {
      type,
      id,
    },
  }) as unknown as Promise<any>;
};
