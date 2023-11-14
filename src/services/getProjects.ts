import { Get_Projects } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

const getProjects = () => {
  return Taro.cloud.callFunction({
    name: Get_Projects,
    data: {},
  }) 
};

export default getProjects;
