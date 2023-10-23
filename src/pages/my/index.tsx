import UserInfoCard from "@/components/userInfoCard";
import { View } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import PersonalInfoIcon from "@/assets/personalInfoIcon.jpg"
import MyCollectionsIcon from "@/assets/myCollectionsIcon.jpg"
import RecycleBinIcon from "@/assets/recycleBinIcon.jpg"
import SettingIcon from "@/assets/settingIcon.jpg"
import UsersManage from "@/assets/usersManage.png"
import { Fragment, useEffect, useState } from "react";
import getAllRoles from "@/services/getAllRoles";
import { findUserById } from "@/services/findUserById";
import "./index.module.less"
import ArrowRight from "../../assets/arrowRight.png"
import { Role } from "../usersManage";

interface ListItem {
    id: string
    imgSrc: string
    text: string
}

interface UserInfo {
    roleId: string
    username: string
    avatorUrl: string
    roleName: string
}

export default function My() {

    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [userId, setUserId] = useState("")

    const listItems: ListItem[] = [
        {
            id: "0",
            imgSrc: PersonalInfoIcon,
            text: "个人信息"
        },
        {
            id: "1",
            imgSrc: MyCollectionsIcon,
            text: "我的收藏"
        },
        {
            id: "3",
            imgSrc: UsersManage,
            text: "用户管理"
        },
        {
            id: "2",
            imgSrc: RecycleBinIcon,
            text: "回收站"
        },
        {
            id: "4",
            imgSrc: SettingIcon,
            text: "设置"
        }
    ]

    function handleClick(itemText: string) {
        if (itemText === "个人信息") {
            Taro.navigateTo({ url: `/pages/personalInfo/index?userId=${userId}` })
            return
        }
        if (itemText === "回收站") {
            Taro.navigateTo({ url: "/pages/recyclebin/index" })
            return
        }
        if (itemText === "我的收藏") {
            Taro.navigateTo({ url: "/pages/mycollections/index" })
            return
        }
        if (itemText === "用户管理") {
            Taro.navigateTo({ url: `/pages/usersManage/index?roleId=${userInfo?.roleId}` })
            return
        }
        if (itemText === "设置") {
            Taro.showToast({
                title: "暂未开放",
                icon: "error",
                duration: 2000
            })
            return
        }
    }

    useDidShow(() => {
        init()
    })

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const res = await Taro.getStorage({ key: "userInfo" })
        if (!res) return
        setUserId(res.data.userId)
        const avatorUrlRes = await findUserById(res.data.userId)
        if (!avatorUrlRes) return
        const rolesRes = await getAllRoles()
        if (!rolesRes) return
        const userDetail = {
            roleId: avatorUrlRes.result[0].roleId,
            username: avatorUrlRes.result[0].username,
            avatorUrl: avatorUrlRes.result[0].avatorUrl,
            roleName: rolesRes.result.find((role: Role) => role.roleId === avatorUrlRes.result[0].roleId).roleName
        }
        setUserInfo(userDetail)
        Taro.setStorage({ key: "roleList", data: rolesRes.result })
        Taro.setStorage({ key: "userDetail", data: userDetail })
    }

    async function logout() {
        const res = await Taro.removeStorage({ key: "userInfo" })
        const res2 = await Taro.removeStorage({ key: "userDetail" })
        if (!res && !res2) {
            Taro.showToast({
                title: "退出失败！",
                icon: "error",
                duration: 2000
            })
            return
        }
        Taro.navigateTo({ url: "/pages/index/index" })
    }

    return (
        <View className='my'>
            <View className='solid-color-base-floor'></View>
            <UserInfoCard avatorUrl={userInfo?.avatorUrl} username={userInfo?.username} roleName={userInfo?.roleName} userId={userId} />
            <View className='features'>
                {listItems.map((item: ListItem) => {
                    return (
                        <Fragment key={item.id}>
                            {!(userInfo?.roleName === "普通用户" && item.text === "用户管理") && <View className='feature' onClick={() => handleClick(item.text)}>
                                <View className='left'>
                                    <img src={item.imgSrc} alt='' />
                                    <View className='text'>{item.text}</View>
                                </View>
                                <img src={ArrowRight} alt='' />
                            </View>}
                        </Fragment>
                    )
                })}
            </View>
            <View className='logout-btn-wrapper'>
                <View className='logout' onClick={logout}>退出登录</View>
            </View>
        </View>
    )
}