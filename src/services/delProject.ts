import { Del_Project } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const delProject = (_id?: string) => {
  return Taro.cloud.callFunction({
    name: Del_Project,
    data: {
      _id,
    },
  })
};
