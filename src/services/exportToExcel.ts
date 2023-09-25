import { Function_Export_Data } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const exportToExcelFn = () => {
  return Taro.cloud.callFunction({
    name: Function_Export_Data,
    data: {},
  }) as unknown 
};
