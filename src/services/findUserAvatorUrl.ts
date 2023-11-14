import { Function_Find_User_AvatorUrl } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const findUserAvatorUrl = (username: string, password: string) => {
  return Taro.cloud.callFunction({
    name: Function_Find_User_AvatorUrl,
    data: {
      username,
      password,
    },
  })
};

