import { View } from "@tarojs/components"
import { Fragment, useEffect, useState } from "react"
import getAllUsers from "@/services/getAllUsers"
import UserCard, { UserCardProps } from "@/components/userCard"
import getAllRoles from "@/services/getAllRoles"
// import Taro from "@tarojs/taro"
import { AtActivityIndicator } from "taro-ui"
import UserEditModal from "@/components/userEditModal"
import AddUserIcon from "@/assets/adduserIcon.pic.jpg"
import Shadow from "@/components/shadow"
import Taro from "@tarojs/taro"
import "./index.module.less"

interface User {
    _id: string
    avatorUrl: string
    roleId: string
    username: string
    password: string
}

type SpecialUser = Pick<UserCardProps, "userId" | "userName" | "roleName" | "avatorUrl" | "password">

export interface Role {
    _id: string
    roleId: string
    roleName: string
}

const UsersManage = () => {

    const [userList, setUserList] = useState<SpecialUser[]>([])
    const [gotData, setGotData] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [editUserInfo, setEditUserInfo] = useState<SpecialUser | null | undefined>(null)

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
        Taro.setStorage({ key: "roleList", data: rolesRes.result })
        setGotData(true)
    }

    function handleEdit(e: string) {
        setEditUserInfo(userList.find((user: SpecialUser) => user.userId === e))
        console.log(2, userList.find((user: SpecialUser) => user.userId === e));
        setEditModalShow(true)
    }

    function handleDelete(e: string) {

    }

    function handleSubmit(e: any) {
        console.log(5, e)
    }

    function handleCloseUserEditModal() {
        setEditModalShow(false)
    }

    return (
        <Fragment>
            {gotData ? <Fragment>
                <View className='users-manage'>
                    {userList.map((item: SpecialUser) => {
                        return <UserCard key={item.userId} userId={item.userId} userName={item.userName} roleName={item.roleName} password={item.password} editOption={handleEdit} deleteOption={handleDelete} avatorUrl={item.avatorUrl} />
                    })}
                </View>
                <img src={AddUserIcon} className='add-user-icon' />
                {editModalShow && <Shadow onClose={() => setEditModalShow(false)} />}
                {editModalShow && <UserEditModal submit={handleSubmit} userName={editUserInfo?.userName} roleName={editUserInfo?.roleName} password={editUserInfo?.password} closeUserEditModal={handleCloseUserEditModal} />}
            </Fragment>
                : <View className='data-loading-container'>
                    <AtActivityIndicator color='#169E3B' content='加载中...'></AtActivityIndicator>
                </View>}
        </Fragment>
    )
}

export default UsersManage