import { updateUserInfoSec } from "@/services/updateUserInfoSec"
import { Input, View } from "@tarojs/components"
import Taro, { useRouter } from "@tarojs/taro"
import { useState } from "react"
import ClearInputIcon from "@/assets/clearInput.png"
import "./index.module.less"

const SetUsername = () => {

    const router = useRouter()
    const { userId, userName } = router.params
    const [currentUserName, setCurrentUserName] = useState(userName)

    async function complete() {
        if (currentUserName === "") {
            Taro.showToast({
                title: "用户名为空",
                icon: "error",
                duration: 2000
            })
            return
        }
        const res = await updateUserInfoSec(userId, currentUserName)
        if (!res) return
        Taro.navigateBack()
    }

    return (
        <View className='set-username'>
            <View className='top'>
                <Input type='text' className='input' value={currentUserName} onInput={(e) => setCurrentUserName(e.detail.value)} onConfirm={complete} />
                <img src={ClearInputIcon} className='clear-input-icon' onClick={() => setCurrentUserName("")} />
            </View>
            <View className='btn-group'>
                <View className='cancel' onClick={() => Taro.navigateBack()}>取消</View>
                <View className='complete' onClick={complete}>完成</View>
            </View>
        </View>
    )
}

export default SetUsername