import Taro from "@tarojs/taro";
import { Function_Clear_Recyclebin } from "../constant/cloudFunctionNames";

export const clearRecycleBin = () => {
  return Taro.cloud.callFunction({
    name: Function_Clear_Recyclebin,
    data: {},
  });
};
