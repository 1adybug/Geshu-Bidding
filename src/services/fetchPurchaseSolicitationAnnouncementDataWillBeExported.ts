import { Function_Fetch_Purchase_Solicitation_Announcement_Details_Will_Be_Exported } from "@/constant/cloudFunctionNames";
import Taro from "@tarojs/taro";

export const fetchPurchaseSolicitationAnnouncementDataWillBeExported = () => {
  return Taro.cloud.callFunction({
    name: Function_Fetch_Purchase_Solicitation_Announcement_Details_Will_Be_Exported,
    data: {},
  }) as unknown as Promise<FetchPurchaseSolicitationAnnouncementDetailsWillBeExported | null>
};
