import { Function_MyFunction } from "@/constant/functions";
import Taro from "@tarojs/taro";

export const fetchTest = () => {
  return Taro.cloud.callFunction({
    name: Function_MyFunction,
    data: {},
  });
};
