import { View } from "@tarojs/components"
import Avator from "@/assets/avator.jpg"
import "./index.module.less"

interface UserCardProps {
    userId: string
    userName: string
    role: string
    password: string
    editOption: (userId: string) => void
    deleteOption: (userId: string) => void
}

const UserCard = (props: UserCardProps) => {

    const { userId, userName, role, password, editOption, deleteOption } = props

    return (
        <View className='user-card'>
            <View className='top'>
                <img src={Avator} alt='' className='avator' />
                <View className='top-right'>
                    <View className='top-right-top'>
                        <View className='username'>{userName}</View>
                        <View className='role'>{role}</View>
                    </View>
                    <View className='password'>{password}</View>
                </View>
            </View>
            <View className='bottom'>
                <View className='edit' onClick={() => editOption(userId)}>编辑</View>
                <View className='delete' onClick={() => deleteOption(userId)}>删除</View>
            </View>
        </View>
    )
}

export default UserCard