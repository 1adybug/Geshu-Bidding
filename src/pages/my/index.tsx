import UserInfoCard from "@/components/userInfoCard";
import { View } from "@tarojs/components";
import "./index.module.less"

export default function My() {

    const userInfo = {
        userWechatNo: "wy19945372694",
        userWechatName: "Ak-103",
        userWechatImgURL: "xxxxxxxxxx"
    }

    return (
        <View className='my'>
            <View className='solid-color-base-floor'></View>
            <UserInfoCard userWechatNo={userInfo.userWechatNo} userWechatName={userInfo.userWechatName} userWechatImgURL={userInfo.userWechatImgURL} />
        </View>
    )
}