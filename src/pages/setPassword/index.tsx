import { updateUserInfoSec } from "@/services/updateUserInfoSec"
import { Input, View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useState } from "react"

interface SetPasswordProps {
    userId: string
    password: string
}

const SetPassword = (props: SetPasswordProps) => {

    const { userId, password } = props

    const [currentPassword, setCurrentPassword] = useState(password)

    async function complete() {
        const res = await updateUserInfoSec(userId, password)
        if (!res) return
        Taro.navigateBack()
    }

    return (
        <View className='set-username'>
            <Input type='nickname' value={currentPassword} onInput={(e) => setCurrentPassword(e.detail.value)} />
            <View className='btn-group'>
                <View className='cancel' onClick={() => Taro.navigateBack()}>取消</View>
                <View className='complete' onClick={complete}>完成</View>
            </View>
        </View>
    )
}

export default SetPassword