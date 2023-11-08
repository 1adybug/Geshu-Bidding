import Taro from "@tarojs/taro";
import { Analyze_Excel } from "../constant/cloudFunctionNames";

export const analyzeExcel = (url: string) => {
  const res = Taro.cloud.callFunction({
    name: Analyze_Excel,
    data: {
      url,
    },
  });
  return res as any;
};
