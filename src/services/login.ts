import { Function_Login } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

const login = (loginUsername: string, loginPassword: string) => {
  return Taro.cloud.callFunction({
    name: Function_Login,
    data: {
      loginUsername,
      loginPassword,
    },
  }) as unknown as Promise<any>;
};

export default login;
