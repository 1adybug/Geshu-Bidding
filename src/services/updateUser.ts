import { Function_Update_UserInfo } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

interface UpdateUserProps {
  userName: string;
  roleName: string;
  password: string;
  userId?: string;
}

export const updateUser = (submitObj: UpdateUserProps) => {
  return Taro.cloud.callFunction({
    name: Function_Update_UserInfo,
    data: {
      userId: submitObj.userId,
      userName: submitObj.userName,
      roleName: submitObj.roleName,
      password: submitObj.password,
    },
  }) as unknown as Promise<any>;
};
