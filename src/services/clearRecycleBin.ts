import Taro from "@tarojs/taro";
import { Function_Clear_Recyclebin } from "../constant/cloudFunctionNames";

export const clearRecycleBin = () => {
  const res = Taro.cloud.callFunction({
    name: Function_Clear_Recyclebin,
    data: {},
  });
  return res;
};
