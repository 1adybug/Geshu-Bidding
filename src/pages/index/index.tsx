import { Fragment, useEffect, useState } from "react"
import { View } from "@tarojs/components"
import UserEditModal from "@/components/userEditModal"
import Logo from "@/assets/logo.jpg"
import Taro from "@tarojs/taro"
import Shadow from "@/components/shadow"
import "./index.module.less"

export default function Index() {

  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [isLoged, setIsLoged] = useState(false)

  useEffect(() => {
    init()
  }, [])

  async function init() {
    try {
      await Taro.getStorage({ key: "userInfo" })
      Taro.reLaunch({
        url: '/pages/home/index'
      })
    } catch (err) {
      setIsLoged(true)
      return
    }
  }

  function handleUpdateSucceed() {
    Taro.reLaunch({
      url: '/pages/home/index'
    })
  }

  return (
    <View className='index'>
      {isLoged && <View className='container'>
        <View className='top'>
          <img src={Logo} alt='' />
          <View className='title'>格数招标</View>
        </View>
        <View className='login-button' onClick={() => setLoginModalOpen(true)}>登录</View>
        {loginModalOpen &&
          <Fragment>
            <UserEditModal source='login' closeUserEditModal={() => setLoginModalOpen(false)} updateSucceed={handleUpdateSucceed} />
            <Shadow onClose={() => setLoginModalOpen(false)} />
          </Fragment>}
      </View>}
    </View>
  )
}

