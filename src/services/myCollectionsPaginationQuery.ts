import { My_Collections_Pagination_Query } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export default function myCollectionsPaginationQuery(pageIndex:number){
  return Taro.cloud.callFunction({
    name: My_Collections_Pagination_Query,
    data: {
        pageIndex
    },
  }) 
};
