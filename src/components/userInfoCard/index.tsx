import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import "./index.module.less"

interface UserInfoCardProps {
    userId: string
    avatorUrl?: string
    username?: string
    roleName?: string
}

export default function UserInfoCard(props: UserInfoCardProps) {
    const { userId, avatorUrl, username, roleName } = props

    function handleCardClick() {
        Taro.navigateTo({ url: `/pages/personalInfo/index?userId=${userId}` })
    }

    return (
        <View className='userinfo-card' onClick={handleCardClick}>
            <img src={avatorUrl} alt='' />
            <View className='right-wrapper'>
                <View className='username'>{username}</View>
                <View className='rolename'>{roleName}</View>
            </View>
        </View>
    )
}