import { Get_Solicitation_Collected } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

const getSolicitationCollected = () => {
  return Taro.cloud.callFunction({
    name: Get_Solicitation_Collected,
    data: {},
  }) 
};

export default getSolicitationCollected;
