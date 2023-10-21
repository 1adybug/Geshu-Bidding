import { View } from "@tarojs/components"
import "./index.module.less"

interface UserInfoCardProps {
    avatorUrl?: string
    username?: string
    roleName?: string
}

export default function UserInfoCard(props: UserInfoCardProps) {
    const { avatorUrl, username, roleName } = props
    return (
        <View className='userinfo-card'>
            <img src={avatorUrl} alt='' />
            <View className='right-wrapper'>
                <View className='username'>{username}</View>
                <View className='rolename'>{roleName}</View>
            </View>
        </View>
    )
}