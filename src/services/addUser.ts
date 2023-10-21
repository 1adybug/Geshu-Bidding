import Taro from "@tarojs/taro";
import { Function_Add_User } from "../constant/cloudFunctionNames";

export const addUser = (
  addUsername: string,
  addRoleId: string,
  addAvatorUrl: string
) => {
  const res = Taro.cloud.callFunction({
    name: Function_Add_User,
    data: {
      addUsername,
      addRoleId,
      addAvatorUrl,
    },
  });
  return res;
};
