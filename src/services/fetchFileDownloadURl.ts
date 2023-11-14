import { Function_Fetch_FIleTempDownloadURL_By_FileIDTail } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchFileDownloadURl = (fileIDTail: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_FIleTempDownloadURL_By_FileIDTail,
    data: {
      fileIDTail,
    },
  })
};
