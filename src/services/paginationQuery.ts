import { Pagination_Query } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const paginationQuery = (listItemId: string, pageIndex: number) => {
  return Taro.cloud.callFunction({
    name: Pagination_Query,
    data: {
      listItemId,
      pageIndex,
    },
  })
};
