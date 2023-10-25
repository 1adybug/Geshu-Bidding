import { View } from "@tarojs/components"
import { Fragment, useEffect, useState } from "react"
import getAllUsers from "@/services/getAllUsers"
import UserCard, { UserCardProps } from "@/components/userCard"
import { AtActivityIndicator } from "taro-ui"
import UserEditModal, { Source } from "@/components/userEditModal"
import AddUserIcon from "@/assets/adduserIcon.jpg"
import Shadow from "@/components/shadow"
import Taro, { useRouter } from "@tarojs/taro"
import { deleteUser } from "@/services/deleteUser"
import "./index.module.less"

interface User {
    _id: string
    avatorUrl: string
    roleId: string
    username: string
    password: string
    is_deleted: boolean
}

type SpecialUser = Pick<UserCardProps, "userId" | "userName" | "roleName" | "avatorUrl" | "password">

export interface Role {
    _id: string
    roleId: string
    roleName: string
}

const UsersManage = () => {

    const router = useRouter()
    const { roleId } = router.params
    const [userList, setUserList] = useState<SpecialUser[]>([])
    const [gotData, setGotData] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [editUserInfo, setEditUserInfo] = useState<SpecialUser | null | undefined>(null)
    const [editModalSource, setEditModalSource] = useState<Source>("edit")

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const usersRes = await getAllUsers()
        if (!usersRes) return
        const rolesRes = await Taro.getStorage({ key: "roleList" })
        if (!rolesRes) return
        setUserList(usersRes.result.map((item: User) => {
            return {
                userId: item._id,
                avatorUrl: item.avatorUrl,
                userName: item.username,
                roleName: rolesRes.data.find((roleItem: Role) => roleItem.roleId === item.roleId).roleName,
                password: item.password,
                is_deleted: item.is_deleted
            }
        }).filter((user: User) => !user.is_deleted))
        setGotData(true)
    }

    function handleEdit(e: string) {
        setEditModalSource("edit")
        setEditUserInfo(userList.find((user: SpecialUser) => user.userId === e))
        setEditModalShow(true)
    }

    function handleDelete(e: string) {
        Taro.showModal({
            title: "提示",
            content: "确定要删除这位用户吗?",
            success: async (res) => {
                if (res.confirm) {
                    const delRes = await deleteUser(e)
                    if (!delRes) return
                    init()
                    Taro.showToast({
                        title: "删除成功！",
                        icon: "success",
                        duration: 2000
                    })
                    return
                }
                if (res.cancel) {
                    console.log("取消删除！");
                    return
                }
                if (res.errMsg) {
                    console.log("出错：" + res.errMsg);
                    return
                }
            }
        })
    }

    function handleCloseUserEditModal() {
        setEditModalShow(false)
    }

    function handleUpdateSucceed() {
        init()
    }

    function addClick() {
        setEditModalSource("add")
        setEditModalShow(true)
    }

    return (
        <Fragment>
            {gotData ? <Fragment>
                <View className='users-manage'>
                    {userList.map((item: SpecialUser) => {
                        return <UserCard key={item.userId} userId={item.userId} userName={item.userName} roleName={item.roleName} password={item.password} editOption={handleEdit} deleteOption={handleDelete} avatorUrl={item.avatorUrl} />
                    })}
                </View>
                {roleId === "000" && <img src={AddUserIcon} className='add-user-icon' onClick={addClick} />}
                {editModalShow && <Shadow onClose={() => setEditModalShow(false)} />}
                {editModalShow && <UserEditModal userName={editUserInfo?.userName} roleName={editUserInfo?.roleName} password={editUserInfo?.password} closeUserEditModal={handleCloseUserEditModal} userId={editUserInfo?.userId} updateSucceed={handleUpdateSucceed} source={editModalSource} avatorUrl={editUserInfo?.avatorUrl} />}
            </Fragment>
                : <View className='data-loading-container'>
                    <AtActivityIndicator color='#169E3B' content='加载中...'></AtActivityIndicator>
                </View>}
        </Fragment>
    )
}

export default UsersManage