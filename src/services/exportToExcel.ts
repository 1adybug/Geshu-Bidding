import { Function_Export_Data } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const exportToExcelFn = (data: string[][]) => {
  return Taro.cloud.callFunction({
    name: Function_Export_Data,
    data: {
      data,
    },
  })
};
