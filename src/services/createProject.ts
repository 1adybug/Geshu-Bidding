import { Create_Project } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const createProject = (submitObj: any) => {
  return Taro.cloud.callFunction({
    name: Create_Project,
    data: {
      submitObj,
    },
  });
};
