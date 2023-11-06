import Taro from "@tarojs/taro";
import { Analyze_Excel } from "../constant/cloudFunctionNames";

export const analyzeExcel = () => {
  const res = Taro.cloud.callFunction({
    name: Analyze_Excel,
    data: {},
  });
  return res;
};
