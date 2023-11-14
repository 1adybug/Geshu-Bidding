import { Function_Get_All_Users } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

const getAllUsers = () => {
  return Taro.cloud.callFunction({
    name: Function_Get_All_Users,
    data: {},
  }) 
};

export default getAllUsers;
