import { Get_Local_Collected } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

const getLocalCollected = () => {
  return Taro.cloud.callFunction({
    name: Get_Local_Collected,
    data: {},
  }) 
};

export default getLocalCollected;
