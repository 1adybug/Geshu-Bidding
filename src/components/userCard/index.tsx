import { View } from "@tarojs/components"
import { useEffect, useState } from "react"
import Taro from "@tarojs/taro"
import "./index.module.less"

export interface UserCardProps {
    avatorUrl: string
    userId: string
    userName: string
    roleName: string
    password: string
    deleteOption: (userId: string) => void
}

const UserCard = (props: UserCardProps) => {

    const { avatorUrl, userId, userName, roleName, deleteOption } = props
    const [currentRoleId, setCurrentRoleId] = useState("")

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const res = await Taro.getStorage({ key: "userDetail" })
        if (!res) return
        setCurrentRoleId(res.data.roleId)
    }

    function handleEditClick() {
        Taro.navigateTo({ url: `/pages/personalInfo/index?userId=${userId}&source=editUser` })
    }

    return (
        <View className='user-card'>
            <View className='top'>
                <img src={avatorUrl} alt='' />
                <View className='top-right'>
                    <View className='username'>{userName}</View>
                    <View className='role'>{roleName}</View>
                </View>
            </View>
            <View className='bottom'>
                {!(currentRoleId === "001" && roleName === "超级管理员") && <View className='edit' onClick={handleEditClick}>编辑</View>}
                {roleName !== "超级管理员" && <View className='delete' onClick={() => deleteOption(userId)}>删除</View>}
            </View>
        </View>
    )
}

export default UserCard