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
    editOption: (userId: string) => void
    deleteOption: (userId: string) => void
}

const UserCard = (props: UserCardProps) => {

    const { avatorUrl, userId, userName, roleName, editOption, deleteOption } = props
    const [currentRoleId, setCurrentRoleId] = useState("")

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const res = await Taro.getStorage({ key: "userDetail" })
        if (!res) return
        setCurrentRoleId(res.data.roleId)
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
                {!(currentRoleId === "001" && roleName === "超级管理员") && <View className='edit' onClick={() => editOption(userId)}>编辑</View>}
                {roleName !== "超级管理员" && <View className='delete' onClick={() => deleteOption(userId)}>删除</View>}
            </View>
        </View>
    )
}

export default UserCard