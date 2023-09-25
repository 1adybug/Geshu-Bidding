import { Function_Fetch_Exported_File_Download_URL } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchExportedFileDownloadURl = (fileID: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Exported_File_Download_URL,
    data: {
      fileID,
    },
  }) as unknown as Promise<FetchExportedFileDownloadURl>
};
