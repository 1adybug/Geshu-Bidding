import { Get_Intention_Collected } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

const getIntentionCollected = () => {
  return Taro.cloud.callFunction({
    name: Get_Intention_Collected,
    data: {},
  }) 
};

export default getIntentionCollected;
