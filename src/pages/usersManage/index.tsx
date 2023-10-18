import { View } from "@tarojs/components"
import { Fragment, useEffect, useState } from "react"
import getAllUsers from "@/services/getAllUsers"
import UserCard, { UserCardProps } from "@/components/userCard"
import getAllRoles from "@/services/getAllRoles"
import Taro from "@tarojs/taro"
import { AtActivityIndicator } from "taro-ui"
import "./index.module.less"

interface User {
    _id: string
    avatorUrl: string
    roleId: string
    username: string
    password: string
}

type SpecialUser = Pick<UserCardProps, "userId" | "userName" | "roleName" | "avatorUrl" | "password">

interface Role {
    _id: string
    roleId: string
    roleName: string
}

const UsersManage = () => {

    const [userList, setUserList] = useState<SpecialUser[]>([])
    const [gotData, setGotData] = useState(false)

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const usersRes = await getAllUsers()
        if (!usersRes) return
        const rolesRes = await getAllRoles()
        if (!rolesRes) return
        setUserList(usersRes.result.map((item: User) => {
            return {
                userId: item._id,
                avatorUrl: item.avatorUrl,
                userName: item.username,
                roleName: rolesRes.result.find((roleItem: Role) => roleItem.roleId === item.roleId).roleName,
                password: item.password
            }
        }))
        setGotData(true)
    }

    function handleEdit(e: string) {

    }

    function handleDelete(e: string) {

    }

    return (
        <Fragment>
            {gotData ? <View className='users-manage'>
                {userList.map((item: SpecialUser) => {
                    return <UserCard key={item.userId} userId={item.userId} userName={item.userName} roleName={item.roleName} password={item.password} editOption={handleEdit} deleteOption={handleDelete} avatorUrl={item.avatorUrl} />
                })}
            </View> : <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='加载中...'></AtActivityIndicator>
            </View>}
        </Fragment>
    )
}

export default UsersManage