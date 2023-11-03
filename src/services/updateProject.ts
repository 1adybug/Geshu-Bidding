import { Update_Project } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const updateProject = (submitObj: any) => {
  return Taro.cloud.callFunction({
    name: Update_Project,
    data: {
      submitObj,
    },
  }) as unknown as Promise<any>;
};
