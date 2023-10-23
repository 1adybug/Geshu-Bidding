import { updateUserInfoSec } from "@/services/updateUserInfoSec"
import { Input, View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useState } from "react"

interface SetUsernameProps {
    userId: string
    userName: string
}

const SetUsername = (props: SetUsernameProps) => {

    const { userId, userName } = props

    const [currentUserName, setCurrentUserName] = useState(userName)

    async function complete() {
        const res = await updateUserInfoSec(userId, userName)
        if (!res) return
        Taro.navigateBack()
    }

    return (
        <View className='set-username'>
            <Input type='nickname' value={currentUserName} onInput={(e) => setCurrentUserName(e.detail.value)} />
            <View className='btn-group'>
                <View className='cancel' onClick={() => Taro.navigateBack()}>取消</View>
                <View className='complete' onClick={complete}>完成</View>
            </View>
        </View>
    )
}

export default SetUsername