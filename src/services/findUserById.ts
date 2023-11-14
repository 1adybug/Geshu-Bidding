import { Function_Find_User_By_Id } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const findUserById = (userId?: string) => {
  return Taro.cloud.callFunction({
    name: Function_Find_User_By_Id,
    data: {
      userId,
    },
  })
};