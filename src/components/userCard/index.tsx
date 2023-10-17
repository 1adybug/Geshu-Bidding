import { View } from "@tarojs/components"
import "./index.module.less"

interface UserCardProps {
    userId: string
    userName: string
    password: string
    editOption: (userId: string) => void
    deleteOption: (userId: string) => void
}

const UserCard = (props: UserCardProps) => {

    const { userId, userName, password, editOption, deleteOption } = props

    return (
        <View className='user-card'>
            <View className='top'>
                <View className='username'>{userName}</View>
                <View className='password'>{password}</View>
            </View>
            <View className='bottom'>
                <View className='edit' onClick={() => editOption(userId)}>编辑</View>
                <View className='delete' onClick={() => deleteOption(userId)}>删除</View>
            </View>
        </View>
    )
}

export default UserCard