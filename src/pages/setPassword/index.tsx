import { updateUserInfoSec } from "@/services/updateUserInfoSec"
import { Input, View } from "@tarojs/components"
import Taro, { useRouter } from "@tarojs/taro"
import { useState } from "react"
import ClearInputIcon from "@/assets/clearInput.png"
import "./index.module.less"

const SetPassword = () => {

    const router = useRouter()
    const { userId, password } = router.params

    const [currentPassword, setCurrentPassword] = useState(password)

    async function complete() {
        if (currentPassword === "") {
            Taro.showToast({
                title: "密码为空",
                icon: "error",
                duration: 2000
            })
            return
        }
        const res = await updateUserInfoSec(userId, undefined, currentPassword)
        if (!res) return
        Taro.navigateBack()
    }

    return (
        <View className='set-password'>
            <View className='top'>
                <Input type='text' className='input' value={currentPassword} onInput={(e) => setCurrentPassword(e.detail.value)} onConfirm={complete} />
                <img src={ClearInputIcon} className='clear-input-icon' onClick={() => setCurrentPassword("")} />
            </View>
            <View className='btn-group'>
                <View className='cancel' onClick={() => Taro.navigateBack()}>取消</View>
                <View className='complete' onClick={complete}>完成</View>
            </View>
        </View>
    )
}

export default SetPassword