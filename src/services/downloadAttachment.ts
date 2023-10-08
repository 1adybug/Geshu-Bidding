import { Function_Fetch_Attachment_File } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const downloadAttachment = (fileUrl: string, fileExtension: string) => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Attachment_File,
    data: {
      fileUrl,
      fileExtension
    },
  }) as unknown as Promise<any>;
};
