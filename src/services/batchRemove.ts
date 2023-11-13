import Taro from "@tarojs/taro";
import { Batch_Remove } from "../constant/cloudFunctionNames";

export const batchRemove = (currentListItemId: string, deletes: string[]) => {
  const res = Taro.cloud.callFunction({
    name: Batch_Remove,
    data: {
      currentListItemId,
      deletes,
    },
  });
  return res as any;
};
