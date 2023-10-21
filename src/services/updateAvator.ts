import { Function_Edit_Avator } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const editAvator = (exten: string, userId?: string, file?: string) => {
  return Taro.cloud.callFunction({
    name: Function_Edit_Avator,
    data: {
      file,
      userId,
      exten,
    },
  }) as unknown as Promise<any>;
};
