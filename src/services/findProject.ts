import { Find_Project } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const findProject = (_id: string) => {
  return Taro.cloud.callFunction({
    name: Find_Project,
    data: {
      _id,
    },
  }) as unknown as Promise<any>;
};
