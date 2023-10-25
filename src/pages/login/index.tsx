import { Input, View } from "@tarojs/components"
import { useState } from "react"
import Taro from "@tarojs/taro"
import login from "@/services/login"
import { findUserAvatorUrl } from "@/services/findUserAvatorUrl"
import LoginCardLittleCircle from "@/assets/loginCardLeftBottom.jpg"
import "./index.module.less"

const Login = () => {

    const [userNameInputed, setUserNameInputed] = useState("")
    const [passwordInputed, setPasswordInputed] = useState("")

    async function submit() {
        Taro.showLoading({
            title: "登录中..."
        })
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
            Taro.hideLoading()
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
                        <View className='label'>
                            <View className='text'>用户名</View>
                            <View className='colon'>：</View>
                        </View>
                        <Input className='input' onInput={(e) => setUserNameInputed(e.detail.value)} />
                    </View>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>密码</View>
                            <View className='colon'>：</View>
                        </View>
                        <Input className='input' onInput={(e) => setPasswordInputed(e.detail.value)} />
                    </View>
                </View>
                <View className='btn-group'>
                    <View className='cancel-btn' onClick={() => Taro.navigateBack()} >取消</View>
                    <View className='login-btn' onClick={submit} >登录</View>
                </View>
                <img src={LoginCardLittleCircle} className='right-mid-circle' />
                <img src={LoginCardLittleCircle} className='login-card-left-bottom' />
            </View>
        </View>
    )
}

export default Login