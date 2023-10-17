import { Function_Get_All_Roles } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

const getAllRoles = () => {
  return Taro.cloud.callFunction({
    name: Function_Get_All_Roles,
    data: {},
  }) as unknown as Promise<any>;
};

export default getAllRoles;
