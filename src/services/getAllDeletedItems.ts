import { Function_Get_All_Items_Deleted } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const getAllDeletedItems = () => {
  return Taro.cloud.callFunction({
    name: Function_Get_All_Items_Deleted,
    data: {},
  })
};
