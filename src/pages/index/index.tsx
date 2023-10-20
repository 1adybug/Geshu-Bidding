import { Fragment, useEffect, useState } from "react"
import { View } from "@tarojs/components"
import UserEditModal from "@/components/userEditModal"
import Logo from "@/assets/logo.jpeg"
import Taro from "@tarojs/taro"
import Shadow from "@/components/shadow"
import "./index.module.less"

export default function Index() {

  const [loginModalOpen, setLoginModalOpen] = useState(false)

  useEffect(() => {
    init()
    // return () => {
    //   console.log(12);

    //   Taro.showTabBar(); // 页面返回时显示 TabBar
    // }
  }, [])

  async function init() {
    // const res = await Taro.getStorage({ key: "" })
  }

  function handleUpdateSucceed() {
    console.log(1);
    Taro.reLaunch({
      url: '/pages/home/index' // 跳转到主页
    })
  }

  return (
    <View className='index'>
      <View className='container'>
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
      </View>
    </View>
  )
}

