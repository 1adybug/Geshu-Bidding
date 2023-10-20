import { Function_Delete_User } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const deleteUser = (userId?: string) => {
  return Taro.cloud.callFunction({
    name: Function_Delete_User,
    data: {
      userId,
    },
  }) as unknown as Promise<any>;
};
