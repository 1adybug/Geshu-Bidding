import { View } from "@tarojs/components"
import Avator from "../../assets/avator.jpg"
import "./index.module.less"

interface UserInfoCardProps {
    userWechatNo: string
    userWechatName: string
    userWechatImgURL: string
}

export default function UserInfoCard(props: UserInfoCardProps) {
    const { userWechatName } = props
    return (
        <View className='userinfo-card'>
            <img src={Avator} alt='' />
            <View className='username'>{userWechatName ? userWechatName : "登录/注册"}</View>
        </View>
    )
}