import { Input, View } from "@tarojs/components"
import { useState } from "react"
import Taro from "@tarojs/taro"
import login from "@/services/login"
import { findUserAvatorUrl } from "@/services/findUserAvatorUrl"
import "./index.module.less"

const Login = () => {

    const [userNameInputed, setUserNameInputed] = useState("")
    const [passwordInputed, setPasswordInputed] = useState("")

    async function submit() {
        const loginRes = await login(userNameInputed, passwordInputed)
        if (!loginRes.result.length) {
            Taro.showToast({
                title: "登录失败!",
                icon: "error",
                duration: 2000
            })
            return
        }
        if (loginRes.result.length) {
            const avatorUrlRes = await findUserAvatorUrl(userNameInputed, passwordInputed)
            const data = {
                userId: avatorUrlRes.result[0]._id,
                username: userNameInputed,
                password: passwordInputed
            }
            await Taro.setStorage({ key: "userInfo", data })
            Taro.reLaunch({
                url: '/pages/home/index'
            })
            return
        }
    }

    return (
        <View className='login'>
            <View className='circle'></View>
            <View className='card'>
                <View className='title'>用户登录</View>
                <View className='content'>
                    <View className='item'>
                        <View className='label'>用户名：</View>
                        <Input className='input' placeholder='请输入用户名' onInput={(e) => setUserNameInputed(e.detail.value)} />
                    </View>
                    <View className='item'>
                        <View className='label'>密码：</View>
                        <Input className='input' placeholder='请输入密码' onInput={(e) => setPasswordInputed(e.detail.value)} />
                    </View>
                </View>
                <View className='btn-group'>
                    <View className='cancel-btn' onClick={() => Taro.navigateBack()} >取消</View>
                    <View className='login-btn' onClick={submit} >登录</View>
                </View>
            </View>
        </View>
    )
}

export default Login