import { Function_Fetch_Local_Announcement_Data_Will_Be_Exported } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchLocalAnnouncementDataWillBeExported = () => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Local_Announcement_Data_Will_Be_Exported,
    data: {},
  }) as unknown as Promise<FetchPurchaseSolicitationAnnouncementDetailsWillBeExported | null>
};
