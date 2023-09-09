import UserInfoCard from "@/components/userInfoCard";
import { View } from "@tarojs/components";
import "./index.module.less"
import MyCollections from "../../assets/myCollections.png"
import ArrowRight from "../../assets/arrowRight.png"
import Setting from "../../assets/setting.png"

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
            <View className='features'>
                <View className='feature'>
                    <View className='left'>
                        <img src={MyCollections} alt='' />
                        <View className='text'>我的收藏</View>
                    </View>
                    <img src={ArrowRight} alt='' />
                </View>
                <View className='feature'>
                    <View className='left'>
                        <img src={Setting} alt='' />
                        <View className='text'>设置</View>
                    </View>
                    <img src={ArrowRight} alt='' />
                </View>
            </View>
        </View>
    )
}